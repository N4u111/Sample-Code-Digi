import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { GroupRepository } from '../../../domain/interfaces/group.repository.interface';
import { GROUP_REPOSITORY } from '../../../domain/tokens/group.tokens';

@Injectable()
export class DeleteGroupUseCase {
  constructor(
    @Inject(GROUP_REPOSITORY)
    private readonly groupRepository: GroupRepository,
  ) {}

  async execute(id: string): Promise<void> {
    // Check if group exists
    const existingGroup = await this.groupRepository.findById(id);
    if (!existingGroup) {
      throw new NotFoundException('Group not found');
    }

    // Delete group
    await this.groupRepository.delete(id);
  }
}
