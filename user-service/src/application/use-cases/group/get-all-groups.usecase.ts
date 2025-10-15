import { Injectable, Inject } from '@nestjs/common';
import { GroupRepository } from '../../../domain/interfaces/group.repository.interface';
import { GROUP_REPOSITORY } from '../../../domain/tokens/group.tokens';
import { GroupResponseDto } from '../../dto/group.dto';

@Injectable()
export class GetAllGroupsUseCase {
  constructor(
    @Inject(GROUP_REPOSITORY)
    private readonly groupRepository: GroupRepository,
  ) {}

  async execute(): Promise<GroupResponseDto[]> {
    const groups = await this.groupRepository.findAll();

    return groups.map(group => ({
      id: group.id,
      name: group.name,
      slug: group.slug,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    }));
  }
}
