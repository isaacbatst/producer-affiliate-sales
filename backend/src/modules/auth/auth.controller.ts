import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Constants } from 'src/common/constants';
import { Public } from 'src/decorators/Public';
import { AuthenticatedRequest } from './auth.request';
import { AuthService } from './auth.service';
import { SignInDto } from './sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('login')
  async signIn(
    @Req() request: Request,
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    response.cookie(Constants.AUTH_COOKIE, token, {
      maxAge: Constants.AUTH_COOKIE_EXPIRES_IN,
      httpOnly: true,
      sameSite: request.secure ? 'none' : 'lax',
      domain: request.hostname,
    });
  }

  @HttpCode(200)
  @Post('validate')
  async validate(@Req() request: AuthenticatedRequest) {
    return request.auth.user;
  }
}
