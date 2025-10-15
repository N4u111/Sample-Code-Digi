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
import { PermissionService } from '../services/permission.service';
import { 
  CreatePermissionDto, 
  UpdatePermissionDto, 
  PermissionDetailResponseDto,
  PermissionListResponseDto 
} from '../../../shared/common/dto/permission.dto';

@Controller('user-management/permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPermissionDto: CreatePermissionDto): Promise<PermissionDetailResponseDto> {
    try {
      return await this.permissionService.createPermission(createPermissionDto);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to create permission',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<PermissionListResponseDto> {
    try {
      return await this.permissionService.getAllPermissions();
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to get permissions',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PermissionDetailResponseDto> {
    try {
      return await this.permissionService.getPermissionById(id);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to get permission',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionDetailResponseDto> {
    try {
      return await this.permissionService.updatePermission(id, updatePermissionDto);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to update permission',
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
      await this.permissionService.deletePermission(id);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to delete permission',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
