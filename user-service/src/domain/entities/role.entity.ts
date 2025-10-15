export class Role {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    id: string,
    name: string,
    slug: string,
  ): Role {
    const now = new Date();
    return new Role(id, name, slug, now, now);
  }

  updateName(name: string): Role {
    return new Role(
      this.id,
      name,
      this.slug,
      this.createdAt,
      new Date(),
    );
  }

  updateSlug(slug: string): Role {
    return new Role(
      this.id,
      this.name,
      slug,
      this.createdAt,
      new Date(),
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      slug: this.slug,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
