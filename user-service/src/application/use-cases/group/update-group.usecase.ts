import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { Group } from '../../../domain/entities/group.entity';
import { GroupRepository } from '../../../domain/interfaces/group.repository.interface';
import { GROUP_REPOSITORY } from '../../../domain/tokens/group.tokens';
import { UpdateGroupDto, GroupResponseDto } from '../../dto/group.dto';

@Injectable()
export class UpdateGroupUseCase {
  constructor(
    @Inject(GROUP_REPOSITORY)
    private readonly groupRepository: GroupRepository,
  ) {}

  async execute(id: string, dto: UpdateGroupDto): Promise<GroupResponseDto> {
    // Check if group exists
    const existingGroup = await this.groupRepository.findById(id);
    if (!existingGroup) {
      throw new NotFoundException('Group not found');
    }

    // Check if new name conflicts with existing groups
    if (dto.name && dto.name !== existingGroup.name) {
      const groupWithSameName = await this.groupRepository.findByName(dto.name);
      if (groupWithSameName) {
        throw new ConflictException('Group with this name already exists');
      }
    }

    // Check if new slug conflicts with existing groups
    if (dto.slug && dto.slug !== existingGroup.slug) {
      const groupWithSameSlug = await this.groupRepository.findBySlug(dto.slug);
      if (groupWithSameSlug) {
        throw new ConflictException('Group with this slug already exists');
      }
    }

    // Update group entity
    let updatedGroup = existingGroup;
    if (dto.name) {
      updatedGroup = updatedGroup.updateName(dto.name);
    }
    if (dto.slug) {
      updatedGroup = updatedGroup.updateSlug(dto.slug);
    }

    // Save updated group
    const savedGroup = await this.groupRepository.update(id, updatedGroup);

    return {
      id: savedGroup.id,
      name: savedGroup.name,
      slug: savedGroup.slug,
      createdAt: savedGroup.createdAt,
      updatedAt: savedGroup.updatedAt,
    };
  }
}
