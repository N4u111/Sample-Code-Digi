import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { Permission } from '../../../domain/entities/permission.entity';
import { PermissionRepository } from '../../../domain/interfaces/permission.repository.interface';
import { PERMISSION_REPOSITORY } from '../../../domain/tokens/permission.tokens';
import { UpdatePermissionDto, PermissionResponseDto } from '../../dto/permission.dto';

@Injectable()
export class UpdatePermissionUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async execute(id: string, dto: UpdatePermissionDto): Promise<PermissionResponseDto> {
    // Check if permission exists
    const existingPermission = await this.permissionRepository.findById(id);
    if (!existingPermission) {
      throw new NotFoundException('Permission not found');
    }

    // Check if new name conflicts with existing permissions
    if (dto.name && dto.name !== existingPermission.name) {
      const permissionWithSameName = await this.permissionRepository.findByName(dto.name);
      if (permissionWithSameName) {
        throw new ConflictException('Permission with this name already exists');
      }
    }

    // Check if new code conflicts with existing permissions
    if (dto.code && dto.code !== existingPermission.code) {
      const permissionWithSameCode = await this.permissionRepository.findByCode(dto.code);
      if (permissionWithSameCode) {
        throw new ConflictException('Permission with this code already exists');
      }
    }

    // Update permission entity
    let updatedPermission = existingPermission;
    if (dto.name) {
      updatedPermission = updatedPermission.updateName(dto.name);
    }
    if (dto.code) {
      updatedPermission = updatedPermission.updateCode(dto.code);
    }

    // Save updated permission
    const savedPermission = await this.permissionRepository.update(id, updatedPermission);

    return {
      id: savedPermission.id,
      name: savedPermission.name,
      code: savedPermission.code,
      createdAt: savedPermission.createdAt,
      updatedAt: savedPermission.updatedAt,
    };
  }
}
