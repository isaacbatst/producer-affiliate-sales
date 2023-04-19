import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './sign-in.dto';
import { Response } from 'express';
import { Constants } from 'src/common/constants';
import { Public } from 'src/decorators/Public';

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
    response.cookie(Constants.AUTH_COOKIE, token, { httpOnly: true });
  }
}
