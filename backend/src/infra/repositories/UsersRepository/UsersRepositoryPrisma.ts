import { Inject } from '@nestjs/common';
import { User } from 'src/domain/User/User';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UsersRepositoryPrismaMapper } from './UsersRepositoryPrismaMapper';

export class UsersRepositoryPrisma implements UsersRepository {
  constructor(@Inject('PRISMA_SERVICE') private prisma: PrismaService) {}
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        sessions: true,
      },
    });

    if (!user) {
      return undefined;
    }

    return UsersRepositoryPrismaMapper.toDomain(user);
  }
  async addSession(user: User): Promise<void> {
    const sessions = user.getSessions();
    const session = sessions[sessions.length - 1];
    await this.prisma.user.update({
      where: {
        id: user.getId(),
      },
      data: {
        sessions: {
          create: {
            createdAt: session.getCreatedAt(),
            token: session.getToken(),
          },
        },
      },
    });
  }
}