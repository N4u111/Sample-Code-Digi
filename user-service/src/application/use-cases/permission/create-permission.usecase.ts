import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { Permission } from '../../../domain/entities/permission.entity';
import { PermissionRepository } from '../../../domain/interfaces/permission.repository.interface';
import { PERMISSION_REPOSITORY } from '../../../domain/tokens/permission.tokens';
import { CreatePermissionDto, PermissionResponseDto } from '../../dto/permission.dto';

@Injectable()
export class CreatePermissionUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async execute(dto: CreatePermissionDto): Promise<PermissionResponseDto> {
    // Check if permission with name already exists
    const existingPermissionByName = await this.permissionRepository.findByName(dto.name);
    if (existingPermissionByName) {
      throw new ConflictException('Permission with this name already exists');
    }

    // Check if permission with code already exists
    const existingPermissionByCode = await this.permissionRepository.findByCode(dto.code);
    if (existingPermissionByCode) {
      throw new ConflictException('Permission with this code already exists');
    }

    // Create permission entity
    const permission = Permission.create(
      require('crypto').randomUUID(),
      dto.name,
      dto.code,
    );

    // Save permission
    const savedPermission = await this.permissionRepository.create(permission);

    return {
      id: savedPermission.id,
      name: savedPermission.name,
      code: savedPermission.code,
      createdAt: savedPermission.createdAt,
      updatedAt: savedPermission.updatedAt,
    };
  }
}
