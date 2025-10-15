import { Injectable, Inject } from '@nestjs/common';
import { PermissionRepository } from '../../../domain/interfaces/permission.repository.interface';
import { PERMISSION_REPOSITORY } from '../../../domain/tokens/permission.tokens';
import { PermissionResponseDto } from '../../dto/permission.dto';

@Injectable()
export class GetAllPermissionsUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async execute(): Promise<PermissionResponseDto[]> {
    const permissions = await this.permissionRepository.findAll();

    return permissions.map(permission => ({
      id: permission.id,
      name: permission.name,
      code: permission.code,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
    }));
  }
}
