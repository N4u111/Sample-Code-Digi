import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { Role } from '../../../domain/entities/role.entity';
import { RoleRepository } from '../../../domain/interfaces/role.repository.interface';
import { ROLE_REPOSITORY } from '../../../domain/tokens/role.tokens';
import { CreateRoleDto, RoleResponseDto } from '../../dto/role.dto';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(dto: CreateRoleDto): Promise<RoleResponseDto> {
    // Check if role with name already exists
    const existingRoleByName = await this.roleRepository.findByName(dto.name);
    if (existingRoleByName) {
      throw new ConflictException('Role with this name already exists');
    }

    // Check if role with slug already exists
    const existingRoleBySlug = await this.roleRepository.findBySlug(dto.slug);
    if (existingRoleBySlug) {
      throw new ConflictException('Role with this slug already exists');
    }

    // Create role entity
    const role = Role.create(
      require('crypto').randomUUID(),
      dto.name,
      dto.slug,
    );

    // Save role
    const savedRole = await this.roleRepository.create(role);

    return {
      id: savedRole.id,
      name: savedRole.name,
      slug: savedRole.slug,
      createdAt: savedRole.createdAt,
      updatedAt: savedRole.updatedAt,
    };
  }
}
