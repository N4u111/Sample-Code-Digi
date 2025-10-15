import { Injectable, Logger } from '@nestjs/common';
import { MicroserviceService } from '../../../shared/common/services/microservice.service';
import { USER_SERVICE } from '../../../shared/common/config/microservice.config';
import { 
  CreatePermissionDto, 
  UpdatePermissionDto, 
  PermissionResponseDto,
  PermissionListResponseDto,
  PermissionDetailResponseDto 
} from '../../../shared/common/dto/permission.dto';

@Injectable()
export class PermissionService {
  private readonly logger = new Logger(PermissionService.name);

  constructor(private readonly microserviceService: MicroserviceService) {}

  async createPermission(createPermissionDto: CreatePermissionDto): Promise<PermissionDetailResponseDto> {
    this.logger.log('Creating permission via User Service');
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'permission.create',
      createPermissionDto,
      10000, // 10 second timeout
    );

    if (!response.success) {
      throw new Error(`Failed to create permission: ${response.message}`);
    }

    return response.data as PermissionDetailResponseDto;
  }

  async getAllPermissions(): Promise<PermissionListResponseDto> {
    this.logger.log('Getting all permissions via User Service');
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'permission.findAll',
      {},
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to get permissions: ${response.message}`);
    }

    return response.data as PermissionListResponseDto;
  }

  async getPermissionById(id: string): Promise<PermissionDetailResponseDto> {
    this.logger.log(`Getting permission by ID: ${id} via User Service`);
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'permission.findById',
      { id },
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to get permission: ${response.message}`);
    }

    return response.data as PermissionDetailResponseDto;
  }

  async updatePermission(id: string, updatePermissionDto: UpdatePermissionDto): Promise<PermissionDetailResponseDto> {
    this.logger.log(`Updating permission ID: ${id} via User Service`);
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'permission.update',
      { id, updateData: updatePermissionDto },
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to update permission: ${response.message}`);
    }

    return response.data as PermissionDetailResponseDto;
  }

  async deletePermission(id: string): Promise<void> {
    this.logger.log(`Deleting permission ID: ${id} via User Service`);
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'permission.delete',
      { id },
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to delete permission: ${response.message}`);
    }
  }
}
