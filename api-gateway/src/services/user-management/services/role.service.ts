import { Injectable, Logger } from '@nestjs/common';
import { MicroserviceService } from '../../../shared/common/services/microservice.service';
import { USER_SERVICE } from '../../../shared/common/config/microservice.config';
import { 
  CreateRoleDto, 
  UpdateRoleDto, 
  RoleResponseDto,
  RoleListResponseDto,
  RoleDetailResponseDto 
} from '../../../shared/common/dto/role.dto';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  constructor(private readonly microserviceService: MicroserviceService) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<RoleDetailResponseDto> {
    this.logger.log('Creating role via User Service');
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'role.create',
      createRoleDto,
      10000, // 10 second timeout
    );

    if (!response.success) {
      throw new Error(`Failed to create role: ${response.message}`);
    }

    return response.data as RoleDetailResponseDto;
  }

  async getAllRoles(): Promise<RoleListResponseDto> {
    this.logger.log('Getting all roles via User Service');
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'role.findAll',
      {},
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to get roles: ${response.message}`);
    }

    return response.data as RoleListResponseDto;
  }

  async getRoleById(id: string): Promise<RoleDetailResponseDto> {
    this.logger.log(`Getting role by ID: ${id} via User Service`);
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'role.findById',
      { id },
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to get role: ${response.message}`);
    }

    return response.data as RoleDetailResponseDto;
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<RoleDetailResponseDto> {
    this.logger.log(`Updating role ID: ${id} via User Service`);
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'role.update',
      { id, updateData: updateRoleDto },
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to update role: ${response.message}`);
    }

    return response.data as RoleDetailResponseDto;
  }

  async deleteRole(id: string): Promise<void> {
    this.logger.log(`Deleting role ID: ${id} via User Service`);
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'role.delete',
      { id },
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to delete role: ${response.message}`);
    }
  }
}
