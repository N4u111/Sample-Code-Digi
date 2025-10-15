import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateGroupUseCase } from '../../application/use-cases/group/create-group.usecase';
import { GetGroupByIdUseCase } from '../../application/use-cases/group/get-group-by-id.usecase';
import { GetAllGroupsUseCase } from '../../application/use-cases/group/get-all-groups.usecase';
import { UpdateGroupUseCase } from '../../application/use-cases/group/update-group.usecase';
import { DeleteGroupUseCase } from '../../application/use-cases/group/delete-group.usecase';
import { CreateGroupDto, UpdateGroupDto } from '../../application/dto/group.dto';

@Controller()
export class GroupMessageController {
  constructor(
    private readonly createGroupUseCase: CreateGroupUseCase,
    private readonly getGroupByIdUseCase: GetGroupByIdUseCase,
    private readonly getAllGroupsUseCase: GetAllGroupsUseCase,
    private readonly updateGroupUseCase: UpdateGroupUseCase,
    private readonly deleteGroupUseCase: DeleteGroupUseCase,
  ) {}

  @MessagePattern('group.create')
  async createGroup(@Payload() data: CreateGroupDto) {
    try {
      const group = await this.createGroupUseCase.execute(data);
      return {
        success: true,
        message: 'Group created successfully',
        data: { group },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      };
    }
  }

  @MessagePattern('group.findAll')
  async getAllGroups() {
    try {
      const groups = await this.getAllGroupsUseCase.execute();
      return {
        success: true,
        message: 'Groups retrieved successfully',
        data: {
          groups,
          total: groups.length,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      };
    }
  }

  @MessagePattern('group.findById')
  async getGroupById(@Payload() data: { id: string }) {
    try {
      const group = await this.getGroupByIdUseCase.execute(data.id);
      return {
        success: true,
        message: 'Group retrieved successfully',
        data: { group },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      };
    }
  }

  @MessagePattern('group.update')
  async updateGroup(@Payload() data: { id: string; updateData: UpdateGroupDto }) {
    try {
      const group = await this.updateGroupUseCase.execute(data.id, data.updateData);
      return {
        success: true,
        message: 'Group updated successfully',
        data: { group },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      };
    }
  }

  @MessagePattern('group.delete')
  async deleteGroup(@Payload() data: { id: string }) {
    try {
      await this.deleteGroupUseCase.execute(data.id);
      return {
        success: true,
        message: 'Group deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      };
    }
  }
}
