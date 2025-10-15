import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Role } from '../../domain/entities/role.entity';
import { RoleRepository } from '../../domain/interfaces/role.repository.interface';

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(role: Role): Promise<Role> {
    const createdRole = await this.prisma.role.create({
      data: {
        id: role.id,
        name: role.name,
        slug: role.slug,
      },
    });

    return this.mapToEntity(createdRole);
  }

  async findById(id: string): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });

    return role ? this.mapToEntity(role) : null;
  }

  async findByName(name: string): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: { name },
    });

    return role ? this.mapToEntity(role) : null;
  }

  async findBySlug(slug: string): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: { slug },
    });

    return role ? this.mapToEntity(role) : null;
  }

  async findAll(): Promise<Role[]> {
    const roles = await this.prisma.role.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return roles.map(role => this.mapToEntity(role));
  }

  async update(id: string, role: Role): Promise<Role> {
    const updatedRole = await this.prisma.role.update({
      where: { id },
      data: {
        name: role.name,
        slug: role.slug,
        updatedAt: new Date(),
      },
    });

    return this.mapToEntity(updatedRole);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.role.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const role = await this.prisma.role.findUnique({
      where: { id },
      select: { id: true },
    });

    return !!role;
  }

  async existsByName(name: string): Promise<boolean> {
    const role = await this.prisma.role.findUnique({
      where: { name },
      select: { id: true },
    });

    return !!role;
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const role = await this.prisma.role.findUnique({
      where: { slug },
      select: { id: true },
    });

    return !!role;
  }

  private mapToEntity(role: any): Role {
    return new Role(
      role.id,
      role.name,
      role.slug,
      role.createdAt,
      role.updatedAt,
    );
  }
}
