import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoleUseCase } from '../../application/use-cases/role/create-role.usecase';
import { GetRoleByIdUseCase } from '../../application/use-cases/role/get-role-by-id.usecase';
import { GetAllRolesUseCase } from '../../application/use-cases/role/get-all-roles.usecase';
import { UpdateRoleUseCase } from '../../application/use-cases/role/update-role.usecase';
import { DeleteRoleUseCase } from '../../application/use-cases/role/delete-role.usecase';
import { CreateRoleDto, UpdateRoleDto } from '../../application/dto/role.dto';

@Controller()
export class RoleMessageController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly getRoleByIdUseCase: GetRoleByIdUseCase,
    private readonly getAllRolesUseCase: GetAllRolesUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
  ) {}

  @MessagePattern('role.create')
  async createRole(@Payload() data: CreateRoleDto) {
    try {
      const role = await this.createRoleUseCase.execute(data);
      return {
        success: true,
        message: 'Role created successfully',
        data: { role },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      };
    }
  }

  @MessagePattern('role.findAll')
  async getAllRoles() {
    try {
      const roles = await this.getAllRolesUseCase.execute();
      return {
        success: true,
        message: 'Roles retrieved successfully',
        data: {
          roles,
          total: roles.length,
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

  @MessagePattern('role.findById')
  async getRoleById(@Payload() data: { id: string }) {
    try {
      const role = await this.getRoleByIdUseCase.execute(data.id);
      return {
        success: true,
        message: 'Role retrieved successfully',
        data: { role },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      };
    }
  }

  @MessagePattern('role.update')
  async updateRole(@Payload() data: { id: string; updateData: UpdateRoleDto }) {
    try {
      const role = await this.updateRoleUseCase.execute(data.id, data.updateData);
      return {
        success: true,
        message: 'Role updated successfully',
        data: { role },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.name,
      };
    }
  }

  @MessagePattern('role.delete')
  async deleteRole(@Payload() data: { id: string }) {
    try {
      await this.deleteRoleUseCase.execute(data.id);
      return {
        success: true,
        message: 'Role deleted successfully',
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
