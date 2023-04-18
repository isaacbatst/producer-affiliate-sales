interface UserParams {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  private id: string;
  private name: string;
  private email: string;
  private password: string;

  constructor({ id, name, email, password }: UserParams) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
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
}
