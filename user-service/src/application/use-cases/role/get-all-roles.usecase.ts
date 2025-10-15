import { Injectable, Inject } from '@nestjs/common';
import { RoleRepository } from '../../../domain/interfaces/role.repository.interface';
import { ROLE_REPOSITORY } from '../../../domain/tokens/role.tokens';
import { RoleResponseDto } from '../../dto/role.dto';

@Injectable()
export class GetAllRolesUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(): Promise<RoleResponseDto[]> {
    const roles = await this.roleRepository.findAll();

    return roles.map(role => ({
      id: role.id,
      name: role.name,
      slug: role.slug,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    }));
  }
}
