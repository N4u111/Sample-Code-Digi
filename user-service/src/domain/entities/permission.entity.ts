export class Permission {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly code: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    id: string,
    name: string,
    code: string,
  ): Permission {
    const now = new Date();
    return new Permission(id, name, code, now, now);
  }

  updateName(name: string): Permission {
    return new Permission(
      this.id,
      name,
      this.code,
      this.createdAt,
      new Date(),
    );
  }

  updateCode(code: string): Permission {
    return new Permission(
      this.id,
      this.name,
      code,
      this.createdAt,
      new Date(),
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
