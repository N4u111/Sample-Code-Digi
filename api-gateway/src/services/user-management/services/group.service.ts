import { Injectable, Logger } from '@nestjs/common';
import { MicroserviceService } from '../../../shared/common/services/microservice.service';
import { USER_SERVICE } from '../../../shared/common/config/microservice.config';
import { 
  CreateGroupDto, 
  UpdateGroupDto, 
  GroupResponseDto,
  GroupListResponseDto,
  GroupDetailResponseDto 
} from '../../../shared/common/dto/group.dto';

@Injectable()
export class GroupService {
  private readonly logger = new Logger(GroupService.name);

  constructor(private readonly microserviceService: MicroserviceService) {}

  async createGroup(createGroupDto: CreateGroupDto): Promise<GroupDetailResponseDto> {
    this.logger.log('Creating group via User Service');
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'group.create',
      createGroupDto,
      10000, // 10 second timeout
    );

    if (!response.success) {
      throw new Error(`Failed to create group: ${response.message}`);
    }

    return response.data as GroupDetailResponseDto;
  }

  async getAllGroups(): Promise<GroupListResponseDto> {
    this.logger.log('Getting all groups via User Service');
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'group.findAll',
      {},
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to get groups: ${response.message}`);
    }

    return response.data as GroupListResponseDto;
  }

  async getGroupById(id: string): Promise<GroupDetailResponseDto> {
    this.logger.log(`Getting group by ID: ${id} via User Service`);
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'group.findById',
      { id },
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to get group: ${response.message}`);
    }

    return response.data as GroupDetailResponseDto;
  }

  async updateGroup(id: string, updateGroupDto: UpdateGroupDto): Promise<GroupDetailResponseDto> {
    this.logger.log(`Updating group ID: ${id} via User Service`);
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'group.update',
      { id, updateData: updateGroupDto },
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to update group: ${response.message}`);
    }

    return response.data as GroupDetailResponseDto;
  }

  async deleteGroup(id: string): Promise<void> {
    this.logger.log(`Deleting group ID: ${id} via User Service`);
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'group.delete',
      { id },
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to delete group: ${response.message}`);
    }
  }
}
