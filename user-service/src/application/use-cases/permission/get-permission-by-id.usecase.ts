import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PermissionRepository } from '../../../domain/interfaces/permission.repository.interface';
import { PERMISSION_REPOSITORY } from '../../../domain/tokens/permission.tokens';
import { PermissionResponseDto } from '../../dto/permission.dto';

@Injectable()
export class GetPermissionByIdUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async execute(id: string): Promise<PermissionResponseDto> {
    const permission = await this.permissionRepository.findById(id);
    
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    return {
      id: permission.id,
      name: permission.name,
      code: permission.code,
      createdAt: permission.createdAt,
      updatedAt: permission.updatedAt,
    };
  }
}
