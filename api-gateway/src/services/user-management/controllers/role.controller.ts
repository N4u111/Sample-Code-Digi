import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  HttpCode, 
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { 
  CreateRoleDto, 
  UpdateRoleDto, 
  RoleDetailResponseDto,
  RoleListResponseDto 
} from '../../../shared/common/dto/role.dto';

@Controller('user-management/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleDetailResponseDto> {
    try {
      return await this.roleService.createRole(createRoleDto);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to create role',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<RoleListResponseDto> {
    try {
      return await this.roleService.getAllRoles();
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to get roles',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RoleDetailResponseDto> {
    try {
      return await this.roleService.getRoleById(id);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to get role',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleDetailResponseDto> {
    try {
      return await this.roleService.updateRole(id, updateRoleDto);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to update role',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.roleService.deleteRole(id);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to delete role',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
