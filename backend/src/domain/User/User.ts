import { Session } from './Session';

interface UserParams {
  id: string;
  name: string;
  email: string;
  password: string;
  sessions?: Session[];
}

export class User {
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private sessions: Session[];

  constructor({ id, name, email, password, sessions }: UserParams) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.sessions = sessions ?? [];
  }

  addSession(session: Session): void {
    this.sessions.push(session);
  }

  removeSession(token: string): void {
    this.sessions = this.sessions.filter(
      (session) => session.getToken() !== token,
    );
  }

  isSessionExpired(token: string, now: Date): boolean {
    const session = this.sessions.find(
      (session) => session.getToken() === token,
    );

    return session?.isExpired(now) ?? false;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getSessions(): Session[] {
    return this.sessions;
  }
}
