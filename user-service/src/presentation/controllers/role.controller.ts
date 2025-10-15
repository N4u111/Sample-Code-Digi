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
} from '@nestjs/common';
import { CreateRoleUseCase } from '../../application/use-cases/role/create-role.usecase';
import { GetRoleByIdUseCase } from '../../application/use-cases/role/get-role-by-id.usecase';
import { GetAllRolesUseCase } from '../../application/use-cases/role/get-all-roles.usecase';
import { UpdateRoleUseCase } from '../../application/use-cases/role/update-role.usecase';
import { DeleteRoleUseCase } from '../../application/use-cases/role/delete-role.usecase';
import {
  CreateRoleDto,
  UpdateRoleDto,
  RoleDetailResponseDto,
  RoleListResponseDto,
} from '../../application/dto/role.dto';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly getRoleByIdUseCase: GetRoleByIdUseCase,
    private readonly getAllRolesUseCase: GetAllRolesUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleDetailResponseDto> {
    const role = await this.createRoleUseCase.execute(createRoleDto);
    
    return {
      success: true,
      message: 'Role created successfully',
      data: { role },
    };
  }

  @Get()
  async findAll(): Promise<RoleListResponseDto> {
    const roles = await this.getAllRolesUseCase.execute();
    
    return {
      success: true,
      message: 'Roles retrieved successfully',
      data: {
        roles,
        total: roles.length,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RoleDetailResponseDto> {
    const role = await this.getRoleByIdUseCase.execute(id);
    
    return {
      success: true,
      message: 'Role retrieved successfully',
      data: { role },
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleDetailResponseDto> {
    const role = await this.updateRoleUseCase.execute(id, updateRoleDto);
    
    return {
      success: true,
      message: 'Role updated successfully',
      data: { role },
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteRoleUseCase.execute(id);
  }
}
