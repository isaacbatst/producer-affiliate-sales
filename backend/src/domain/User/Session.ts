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
