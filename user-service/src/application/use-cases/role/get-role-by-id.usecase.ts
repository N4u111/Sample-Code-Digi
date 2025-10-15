import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { RoleRepository } from '../../../domain/interfaces/role.repository.interface';
import { ROLE_REPOSITORY } from '../../../domain/tokens/role.tokens';
import { RoleResponseDto } from '../../dto/role.dto';

@Injectable()
export class GetRoleByIdUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(id: string): Promise<RoleResponseDto> {
    const role = await this.roleRepository.findById(id);
    
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return {
      id: role.id,
      name: role.name,
      slug: role.slug,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    };
  }
}
