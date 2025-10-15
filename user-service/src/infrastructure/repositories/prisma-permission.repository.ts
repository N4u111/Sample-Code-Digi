import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Permission } from '../../domain/entities/permission.entity';
import { PermissionRepository } from '../../domain/interfaces/permission.repository.interface';

@Injectable()
export class PrismaPermissionRepository implements PermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(permission: Permission): Promise<Permission> {
    const createdPermission = await this.prisma.permission.create({
      data: {
        id: permission.id,
        name: permission.name,
        code: permission.code,
      },
    });

    return this.mapToEntity(createdPermission);
  }

  async findById(id: string): Promise<Permission | null> {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });

    return permission ? this.mapToEntity(permission) : null;
  }

  async findByName(name: string): Promise<Permission | null> {
    const permission = await this.prisma.permission.findUnique({
      where: { name },
    });

    return permission ? this.mapToEntity(permission) : null;
  }

  async findByCode(code: string): Promise<Permission | null> {
    const permission = await this.prisma.permission.findUnique({
      where: { code },
    });

    return permission ? this.mapToEntity(permission) : null;
  }

  async findAll(): Promise<Permission[]> {
    const permissions = await this.prisma.permission.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return permissions.map(permission => this.mapToEntity(permission));
  }

  async update(id: string, permission: Permission): Promise<Permission> {
    const updatedPermission = await this.prisma.permission.update({
      where: { id },
      data: {
        name: permission.name,
        code: permission.code,
        updatedAt: new Date(),
      },
    });

    return this.mapToEntity(updatedPermission);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.permission.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
      select: { id: true },
    });

    return !!permission;
  }

  async existsByName(name: string): Promise<boolean> {
    const permission = await this.prisma.permission.findUnique({
      where: { name },
      select: { id: true },
    });

    return !!permission;
  }

  async existsByCode(code: string): Promise<boolean> {
    const permission = await this.prisma.permission.findUnique({
      where: { code },
      select: { id: true },
    });

    return !!permission;
  }

  private mapToEntity(permission: any): Permission {
    return new Permission(
      permission.id,
      permission.name,
      permission.code,
      permission.createdAt,
      permission.updatedAt,
    );
  }
}
