import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { GroupRepository } from '../../../domain/interfaces/group.repository.interface';
import { GROUP_REPOSITORY } from '../../../domain/tokens/group.tokens';
import { GroupResponseDto } from '../../dto/group.dto';

@Injectable()
export class GetGroupByIdUseCase {
  constructor(
    @Inject(GROUP_REPOSITORY)
    private readonly groupRepository: GroupRepository,
  ) {}

  async execute(id: string): Promise<GroupResponseDto> {
    const group = await this.groupRepository.findById(id);
    
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    return {
      id: group.id,
      name: group.name,
      slug: group.slug,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    };
  }
}
