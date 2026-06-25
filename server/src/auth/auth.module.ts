import { HandlebarsAdapter } from "@nestjs-modules/mailer/adapters/handlebars.adapter"
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/shared/module/prisma.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from "@nestjs/jwt"
import { RedisModule } from 'src/shared/module/Redis.module';
import { join } from 'path';
import { JWT_Access_expire } from "src/shared/constants/config/config";
import { CleanUpService } from "./jobs/cleanup.cron";
import { PassportModule } from "@nestjs/passport";
import { GoogleStrategy } from "./guards/AuthGuard";




@Module({
  imports: [
    PrismaModule,
    RedisModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: JWT_Access_expire
        }
      })
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule, PassportModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>("EMAIL_HOST"),
          port: config.get<number>("EMAIL_PORT"),
          auth: {
            user: config.get<string>("EMAIL_USERNAME"),
            pass: config.get<string>("EMAIL_PASSWORD"),
          },
          secure: false,
          tls: { rejectUnauthorized: false },
        },
        default: {
          from: config.get<string>("EMAIL_FROM"),
        },
        template: {
          dir: join(process.cwd(), 'src/auth/mail/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, CleanUpService, GoogleStrategy],
})
export class AuthModule { }



