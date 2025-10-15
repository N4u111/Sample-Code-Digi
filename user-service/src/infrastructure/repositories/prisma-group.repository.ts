import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Group } from '../../domain/entities/group.entity';
import { GroupRepository } from '../../domain/interfaces/group.repository.interface';

@Injectable()
export class PrismaGroupRepository implements GroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(group: Group): Promise<Group> {
    const createdGroup = await this.prisma.group.create({
      data: {
        id: group.id,
        name: group.name,
        slug: group.slug,
      },
    });

    return this.mapToEntity(createdGroup);
  }

  async findById(id: string): Promise<Group | null> {
    const group = await this.prisma.group.findUnique({
      where: { id },
    });

    return group ? this.mapToEntity(group) : null;
  }

  async findByName(name: string): Promise<Group | null> {
    const group = await this.prisma.group.findUnique({
      where: { name },
    });

    return group ? this.mapToEntity(group) : null;
  }

  async findBySlug(slug: string): Promise<Group | null> {
    const group = await this.prisma.group.findUnique({
      where: { slug },
    });

    return group ? this.mapToEntity(group) : null;
  }

  async findAll(): Promise<Group[]> {
    const groups = await this.prisma.group.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return groups.map(group => this.mapToEntity(group));
  }

  async update(id: string, group: Group): Promise<Group> {
    const updatedGroup = await this.prisma.group.update({
      where: { id },
      data: {
        name: group.name,
        slug: group.slug,
        updatedAt: new Date(),
      },
    });

    return this.mapToEntity(updatedGroup);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.group.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const group = await this.prisma.group.findUnique({
      where: { id },
      select: { id: true },
    });

    return !!group;
  }

  async existsByName(name: string): Promise<boolean> {
    const group = await this.prisma.group.findUnique({
      where: { name },
      select: { id: true },
    });

    return !!group;
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const group = await this.prisma.group.findUnique({
      where: { slug },
      select: { id: true },
    });

    return !!group;
  }

  private mapToEntity(group: any): Group {
    return new Group(
      group.id,
      group.name,
      group.slug,
      group.createdAt,
      group.updatedAt,
    );
  }
}
