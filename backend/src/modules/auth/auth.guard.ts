import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Constants } from 'src/common/constants';
import { UsersRepository } from '../users/users.repository';
import { AuthenticatedRequest } from './auth.request';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: UsersRepository,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.isPublic(context);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.findByToken(token);
    if (!user) {
      throw new UnauthorizedException();
    }

    (request as AuthenticatedRequest).auth = {
      user: {
        email: user.getEmail(),
        id: user.getId(),
        name: user.getName(),
      },
    };
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return request.cookies[Constants.AUTH_COOKIE];
  }

  private isPublic(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      Constants.IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    return isPublic;
  }
}
