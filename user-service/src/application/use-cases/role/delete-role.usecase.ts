import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { RoleRepository } from '../../../domain/interfaces/role.repository.interface';
import { ROLE_REPOSITORY } from '../../../domain/tokens/role.tokens';

@Injectable()
export class DeleteRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(id: string): Promise<void> {
    // Check if role exists
    const existingRole = await this.roleRepository.findById(id);
    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    // Delete role
    await this.roleRepository.delete(id);
  }
}
