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
import { CreatePermissionUseCase } from '../../application/use-cases/permission/create-permission.usecase';
import { GetPermissionByIdUseCase } from '../../application/use-cases/permission/get-permission-by-id.usecase';
import { GetAllPermissionsUseCase } from '../../application/use-cases/permission/get-all-permissions.usecase';
import { UpdatePermissionUseCase } from '../../application/use-cases/permission/update-permission.usecase';
import { DeletePermissionUseCase } from '../../application/use-cases/permission/delete-permission.usecase';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  PermissionDetailResponseDto,
  PermissionListResponseDto,
} from '../../application/dto/permission.dto';

@Controller('permissions')
export class PermissionController {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    private readonly getPermissionByIdUseCase: GetPermissionByIdUseCase,
    private readonly getAllPermissionsUseCase: GetAllPermissionsUseCase,
    private readonly updatePermissionUseCase: UpdatePermissionUseCase,
    private readonly deletePermissionUseCase: DeletePermissionUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPermissionDto: CreatePermissionDto): Promise<PermissionDetailResponseDto> {
    const permission = await this.createPermissionUseCase.execute(createPermissionDto);
    
    return {
      success: true,
      message: 'Permission created successfully',
      data: { permission },
    };
  }

  @Get()
  async findAll(): Promise<PermissionListResponseDto> {
    const permissions = await this.getAllPermissionsUseCase.execute();
    
    return {
      success: true,
      message: 'Permissions retrieved successfully',
      data: {
        permissions,
        total: permissions.length,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PermissionDetailResponseDto> {
    const permission = await this.getPermissionByIdUseCase.execute(id);
    
    return {
      success: true,
      message: 'Permission retrieved successfully',
      data: { permission },
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionDetailResponseDto> {
    const permission = await this.updatePermissionUseCase.execute(id, updatePermissionDto);
    
    return {
      success: true,
      message: 'Permission updated successfully',
      data: { permission },
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deletePermissionUseCase.execute(id);
  }
}
