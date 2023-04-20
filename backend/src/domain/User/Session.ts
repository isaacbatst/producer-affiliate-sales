import { Constants } from 'src/common/constants';

interface SessionParams {
  token: string;
  userId: string;
  createdAt: Date;
}

export class Session {
  private readonly token: string;
  private readonly userId: string;
  private readonly createdAt: Date;

  constructor({ token, userId, createdAt }: SessionParams) {
    this.token = token;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  isExpired(now: Date) {
    const expireTime =
      this.createdAt.getTime() + Constants.AUTH_SESSION_EXPIRES_IN;
    return now.getTime() > expireTime;
  }

  getToken(): string {
    return this.token;
  }

  getUserId(): string {
    return this.userId;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}
