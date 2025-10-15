import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PermissionRepository } from '../../../domain/interfaces/permission.repository.interface';
import { PERMISSION_REPOSITORY } from '../../../domain/tokens/permission.tokens';

@Injectable()
export class DeletePermissionUseCase {
  constructor(
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    // Check if permission exists
    const existingPermission = await this.permissionRepository.findById(id);
    if (!existingPermission) {
      throw new NotFoundException('Permission not found');
    }

    // Delete permission
    await this.permissionRepository.delete(id);
  }
}
