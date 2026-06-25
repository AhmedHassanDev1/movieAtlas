import { ConflictException, ForbiddenException, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { logInType, SignUpData, TokenPayloadType, VerificationEmailType } from './auth.types';
import { hash, compare, genSalt } from 'bcrypt';

import { MailerService } from '@nestjs-modules/mailer';
import { Redis } from "ioredis"
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_Access_expire, JWT_Refresh_expire } from 'src/shared/constants/config/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly config: ConfigService,
        private readonly Repo: PrismaService,
        private readonly MailerService: MailerService,
        @Inject('REDIS_CLIENT') private readonly redis: Redis,
        private readonly jwtService: JwtService
    ) { }


    async genHashpassword(password: string): Promise<string> {
        const salt = await genSalt(10);
        return await hash(password, salt);
    }

    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash);
    }

    generateVerificationToken(): string {
        return Array.from({ length: 6 }, () => Math.random() * 9 | 0).join(''); // Simple random token generator
    }

    async sendVerificationCode({ email, code }: VerificationEmailType): Promise<void> {

        try {
            await this.MailerService.sendMail({
                to: email,
                subject: 'Verify Your Email',
                template: "verification",
                context: {
                    CODE: code
                }
            });
            await this.redis.set(`email_verification:${email}`, code, 'EX', 10 * 60); // Token expires in 5 minutes
        } catch (error) {
            console.error('Error sending verification email:', error);
            throw new HttpException('Error sending verification email', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async generateJwtToken(payload: TokenPayloadType, secret: string, expiresIn: any): Promise<string> {
        const token = await this.jwtService.signAsync(payload, {
            secret,
            expiresIn,
        })
        return token
    }

    async generateRefreshAndAccessTokens(payload: TokenPayloadType) {
        const refresh = await this.generateJwtToken(payload, this.config.get("JWT_REFRESH_SECRET") as string, JWT_Refresh_expire)
        const access = await this.generateJwtToken(payload, this.config.get("JWT_ACCESS_SECRET") as string, JWT_Access_expire)
        return { refresh, access }
    }

    async VerificationEmail({ email, code }: VerificationEmailType) {

        const verificationCode = await this.redis.get(`email_verification:${email}`)
        if (!verificationCode || verificationCode != code) throw new UnauthorizedException("code is invalid or is expire.")
        await this.redis.del(`email_verification:${email}`);
        await this.Repo.user.update({
            where: { email },
            data: { is_verify: true }
        })
        const user = await this.Repo.user.findUnique({
            where: { email },
            select: { id: true, user_name: true, email: true }
        })


        return user

    }

    async signUp(data: SignUpData) {
        const existingUser = await this.Repo.user.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            throw new ConflictException("Email already in use");
        }

        const hashedPassword = await this.genHashpassword(data.password);

        const user = await this.Repo.user.create({
            data: {
                email: data.email,
                user_name: data.user_name,
                password: hashedPassword,

                accounts: {
                    create: {
                        provider: "Local",
                    }
                }
            },
            include: {
                accounts: true
            }
        });

        const code = this.generateVerificationToken();

        await this.sendVerificationCode({
            email: user.email,
            code
        });

        return user;
    }


    async logIn({ email, password }: logInType): Promise<TokenPayloadType> {

        const user = await this.Repo.user.findUnique({
            where: { email },
            include: { accounts: true },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }


        const localAccount = user.accounts.find(
            acc => acc.provider === "Local"
        );

        if (!localAccount) {
            throw new UnauthorizedException(
                "This account uses Google Sign-In."
            );
        }

        if (!user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isValid = await this.verifyPassword(
            password,
            user.password
        );

        if (!isValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!user.is_verify) {
            const token = this.generateVerificationToken();

            await this.sendVerificationCode({
                email,
                code: token,
            });

            throw new ForbiddenException('Email not verified');
        }

        return {
            id: user.id,
            email: user.email,
            user_name: user.user_name,
        };
    }

    async loginByGoogle(profile: any): Promise<TokenPayloadType> {

        const email = profile.email;

        if (!email) {
            throw new UnauthorizedException("Google email not found");
        }

        // 1. check google account
        const account = await this.Repo.account.findFirst({
            where: {
                provider: "Google",
                providerId: profile.googleId,
            },
            include: { user: true },
        });

        if (account) {
            return {
                id: account.user.id,
                email: account.user.email,
                user_name: account.user.user_name,
            };
        }

        // 2. check email collision
        let user = await this.Repo.user.findUnique({
            where: { email },
        });

        if (user) {

            const existingAccount =
                await this.Repo.account.findFirst({
                    where: {
                        userId: user.id,
                        provider: "Google",
                    },
                });

            if (!existingAccount) {
                await this.Repo.account.create({
                    data: {
                        userId: user.id,
                        provider: "Google",
                        providerId: profile.googleId,
                    },
                });
            }

            return {
                id: user.id,
                email: user.email,
                user_name: user.user_name,
            };
        }

        // 3. create new user
        user = await this.Repo.user.create({
            data: {
                email,
                user_name: `${profile.firstName} ${profile.lastName}`,
                is_verify: true,

                accounts: {
                    create: {
                        provider: "Google",
                        providerId: profile.googleId,
                    },
                },
            },
        });


        return {
            id: user.id,
            email: user.email,
            user_name: user.user_name,
        };
    }
}
