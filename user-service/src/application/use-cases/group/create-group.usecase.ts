import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { Group } from '../../../domain/entities/group.entity';
import { GroupRepository } from '../../../domain/interfaces/group.repository.interface';
import { GROUP_REPOSITORY } from '../../../domain/tokens/group.tokens';
import { CreateGroupDto, GroupResponseDto } from '../../dto/group.dto';

@Injectable()
export class CreateGroupUseCase {
  constructor(
    @Inject(GROUP_REPOSITORY)
    private readonly groupRepository: GroupRepository,
  ) {}

  async execute(dto: CreateGroupDto): Promise<GroupResponseDto> {
    // Check if group with name already exists
    const existingGroupByName = await this.groupRepository.findByName(dto.name);
    if (existingGroupByName) {
      throw new ConflictException('Group with this name already exists');
    }

    // Check if group with slug already exists
    const existingGroupBySlug = await this.groupRepository.findBySlug(dto.slug);
    if (existingGroupBySlug) {
      throw new ConflictException('Group with this slug already exists');
    }

    // Create group entity
    const group = Group.create(
      require('crypto').randomUUID(),
      dto.name,
      dto.slug,
    );

    // Save group
    const savedGroup = await this.groupRepository.create(group);

    return {
      id: savedGroup.id,
      name: savedGroup.name,
      slug: savedGroup.slug,
      createdAt: savedGroup.createdAt,
      updatedAt: savedGroup.updatedAt,
    };
  }
}
