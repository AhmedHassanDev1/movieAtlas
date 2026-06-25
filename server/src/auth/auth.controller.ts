import { Controller, Put, Post, Body, Res, Delete, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './dto/Auth.dto';
import { ResendVerificationCodeDTO, VerificationEmailDTO } from './dto/VerificationEmail.dto';
import { TokenPayloadType } from './auth.types';
import express from 'express';
import { hours, minutes, SkipThrottle, Throttle } from '@nestjs/throttler';
import { Public } from 'src/shared/decorators/publicRoute.decorator';
import { User } from 'src/shared/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RefreshRoute } from 'src/shared/decorators/RefreshRoute.decorator';
import { Cookieoptions } from 'src/shared/constants/config/cookies';


@Throttle({ default: { limit: 10, ttl: minutes(5) } })
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  setTokens(refreshToken: string, accessToken: string, res: express.Response) {
    res.cookie('refreshToken', refreshToken, Cookieoptions);
    res.cookie('accessToken', accessToken, Cookieoptions);
  }


  @Get("google")
  @UseGuards(AuthGuard("google"))
  googleAuth() {

  }

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res: express.Response) {
    const profile = req.user;


    const user = await this.authService.loginByGoogle(profile)

    const { refresh, access } = await this.authService.generateRefreshAndAccessTokens(user)
    this.setTokens(refresh, access, res)
    res.redirect(process.env.CLIENT_URL as string)
  }

  @Throttle({ default: { limit: 5, ttl: hours(5) } })
  @Post('/signup')
  async signup(@Body() body: SignUpDTO) {
    await this.authService.signUp(body);
  }

  @Throttle({ default: { limit: 5, ttl: minutes(10) } })
  @Post("/login")
  async logIn(@Body() body: SignInDTO, @Res({ passthrough: true }) res: express.Response) {
    const payload = await this.authService.logIn(body)
    const { refresh, access } = await this.authService.generateRefreshAndAccessTokens(payload)
    this.setTokens(refresh, access, res)
    res.status(201).json({ accessToken: access })

  }

  @Put("/verification-email")
  async verificationEmail(@Body() body: VerificationEmailDTO, @Res({ passthrough: true }) res: express.Response) {
    const payload = await this.authService.VerificationEmail(body)

    const { refresh, access } = await this.authService.generateRefreshAndAccessTokens(payload as TokenPayloadType)


    this.setTokens(refresh, access, res)
    res.status(201).json({ accessToken: access })
  }

  @Throttle({ default: { limit: 1, ttl: minutes(1) } })
  @Post("/resend-verification-email")
  async resendVerificationEmail(@Body() { email }: ResendVerificationCodeDTO) {
    const code = this.authService.generateVerificationToken()
    return await this.authService.sendVerificationCode({ email, code })
  }


  @RefreshRoute()
  @Put("refresh-token")
  async refreshToken(@User() user, @Res({ passthrough: true }) res: express.Response) {
    const { id, user_name, email } = user
    const { access } = await this.authService.generateRefreshAndAccessTokens({ id, user_name, email })

    res.cookie('accessToken', access, Cookieoptions);
  }

  @SkipThrottle()
  @Delete('/logout')
  async logout(
    @Res({ passthrough: true }) res: any,
  ) {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    return {
      message: 'Logged out',
    };
  }
}


