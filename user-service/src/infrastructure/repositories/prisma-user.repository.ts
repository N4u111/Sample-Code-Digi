import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/interfaces/user.repository.interface';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        password: user.password,
      },
    });

    return this.mapToEntity(createdUser);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? this.mapToEntity(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? this.mapToEntity(user) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return users.map(user => this.mapToEntity(user));
  }

  async update(id: string, user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: user.name,
        email: user.email,
        age: user.age,
        password: user.password,
        updatedAt: new Date(),
      },
    });

    return this.mapToEntity(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    return !!user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return !!user;
  }

  private mapToEntity(user: any): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.age,
      user.password,
      user.createdAt,
      user.updatedAt,
    );
  }
}
