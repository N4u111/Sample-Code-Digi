import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { Role } from '../../../domain/entities/role.entity';
import { RoleRepository } from '../../../domain/interfaces/role.repository.interface';
import { ROLE_REPOSITORY } from '../../../domain/tokens/role.tokens';
import { UpdateRoleDto, RoleResponseDto } from '../../dto/role.dto';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(id: string, dto: UpdateRoleDto): Promise<RoleResponseDto> {
    // Check if role exists
    const existingRole = await this.roleRepository.findById(id);
    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    // Check if new name conflicts with existing roles
    if (dto.name && dto.name !== existingRole.name) {
      const roleWithSameName = await this.roleRepository.findByName(dto.name);
      if (roleWithSameName) {
        throw new ConflictException('Role with this name already exists');
      }
    }

    // Check if new slug conflicts with existing roles
    if (dto.slug && dto.slug !== existingRole.slug) {
      const roleWithSameSlug = await this.roleRepository.findBySlug(dto.slug);
      if (roleWithSameSlug) {
        throw new ConflictException('Role with this slug already exists');
      }
    }

    // Update role entity
    let updatedRole = existingRole;
    if (dto.name) {
      updatedRole = updatedRole.updateName(dto.name);
    }
    if (dto.slug) {
      updatedRole = updatedRole.updateSlug(dto.slug);
    }

    // Save updated role
    const savedRole = await this.roleRepository.update(id, updatedRole);

    return {
      id: savedRole.id,
      name: savedRole.name,
      slug: savedRole.slug,
      createdAt: savedRole.createdAt,
      updatedAt: savedRole.updatedAt,
    };
  }
}
