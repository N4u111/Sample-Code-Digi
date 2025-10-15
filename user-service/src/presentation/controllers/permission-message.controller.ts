import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePermissionUseCase } from '../../application/use-cases/permission/create-permission.usecase';
import { GetPermissionByIdUseCase } from '../../application/use-cases/permission/get-permission-by-id.usecase';
import { GetAllPermissionsUseCase } from '../../application/use-cases/permission/get-all-permissions.usecase';
import { UpdatePermissionUseCase } from '../../application/use-cases/permission/update-permission.usecase';
import { DeletePermissionUseCase } from '../../application/use-cases/permission/delete-permission.usecase';
import { CreatePermissionDto, UpdatePermissionDto } from '../../application/dto/permission.dto';

@Controller()
export class PermissionMessageController {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    private readonly getPermissionByIdUseCase: GetPermissionByIdUseCase,
    private readonly getAllPermissionsUseCase: GetAllPermissionsUseCase,
    private readonly updatePermissionUseCase: UpdatePermissionUseCase,
    private readonly deletePermissionUseCase: DeletePermissionUseCase,
  ) {}

  @MessagePattern('permission.create')
  async createPermission(@Payload() data: CreatePermissionDto) {
    try {
      const permission = await this.createPermissionUseCase.execute(data);
      return {
        success: true,
        message: 'Permission created successfully',
        data: { permission },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      };
    }
  }

  @MessagePattern('permission.findAll')
  async getAllPermissions() {
    try {
      const permissions = await this.getAllPermissionsUseCase.execute();
      return {
        success: true,
        message: 'Permissions retrieved successfully',
        data: {
          permissions,
          total: permissions.length,
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

  @MessagePattern('permission.findById')
  async getPermissionById(@Payload() data: { id: string }) {
    try {
      const permission = await this.getPermissionByIdUseCase.execute(data.id);
      return {
        success: true,
        message: 'Permission retrieved successfully',
        data: { permission },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      };
    }
  }

  @MessagePattern('permission.update')
  async updatePermission(@Payload() data: { id: string; updateData: UpdatePermissionDto }) {
    try {
      const permission = await this.updatePermissionUseCase.execute(data.id, data.updateData);
      return {
        success: true,
        message: 'Permission updated successfully',
        data: { permission },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      };
    }
  }

  @MessagePattern('permission.delete')
  async deletePermission(@Payload() data: { id: string }) {
    try {
      await this.deletePermissionUseCase.execute(data.id);
      return {
        success: true,
        message: 'Permission deleted successfully',
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
