export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly age: number,
    public readonly password: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    id: string,
    name: string,
    email: string,
    age: number,
    password: string,
  ): User {
    const now = new Date();
    return new User(id, name, email, age, password, now, now);
  }

  updateName(name: string): User {
    return new User(
      this.id,
      name,
      this.email,
      this.age,
      this.password,
      this.createdAt,
      new Date(),
    );
  }

  updateEmail(email: string): User {
    return new User(
      this.id,
      this.name,
      email,
      this.age,
      this.password,
      this.createdAt,
      new Date(),
    );
  }

  updateAge(age: number): User {
    return new User(
      this.id,
      this.name,
      this.email,
      age,
      this.password,
      this.createdAt,
      new Date(),
    );
  }

  updatePassword(password: string): User {
    return new User(
      this.id,
      this.name,
      this.email,
      this.age,
      password,
      this.createdAt,
      new Date(),
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
