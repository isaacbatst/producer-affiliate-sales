import { User as PrismaUser, Session as PrismaSession } from '@prisma/client';
import { Session } from 'src/domain/User/Session';
import { User } from 'src/domain/User/User';

export class UsersRepositoryPrismaMapper {
  static toDomain(user: PrismaUser & { sessions: PrismaSession[] }): User {
    return new User({
      email: user.email,
      name: user.name,
      id: user.id,
      password: user.password,
      sessions: user.sessions.map(
        (session) =>
          new Session({
            createdAt: session.createdAt,
            token: session.token,
            userId: session.userId,
          }),
      ),
    });
  }
}
