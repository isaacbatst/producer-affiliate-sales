import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { Constants } from 'src/common/constants';
import { Public } from 'src/decorators/Public';
import { UserDto } from '../users/users.dto';
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
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    response.cookie(Constants.AUTH_COOKIE, token, {
      maxAge: Constants.AUTH_SESSION_EXPIRES_IN,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
  }

  @HttpCode(200)
  @Post('validate')
  async validate(@Req() request: AuthenticatedRequest): Promise<UserDto> {
    return {
      id: request.auth.user.getId(),
      email: request.auth.user.getEmail(),
      name: request.auth.user.getName(),
    };
  }

  @HttpCode(200)
  @Post('logout')
  async logout(
    @Req() request: AuthenticatedRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.signOut(request.auth.user, request.auth.token);
    response.clearCookie(Constants.AUTH_COOKIE);
  }
}
