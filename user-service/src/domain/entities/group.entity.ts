export class Group {
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
  ): Group {
    const now = new Date();
    return new Group(id, name, slug, now, now);
  }

  updateName(name: string): Group {
    return new Group(
      this.id,
      name,
      this.slug,
      this.createdAt,
      new Date(),
    );
  }

  updateSlug(slug: string): Group {
    return new Group(
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
