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
import { GroupService } from '../services/group.service';
import { 
  CreateGroupDto, 
  UpdateGroupDto, 
  GroupDetailResponseDto,
  GroupListResponseDto 
} from '../../../shared/common/dto/group.dto';

@Controller('user-management/groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGroupDto: CreateGroupDto): Promise<GroupDetailResponseDto> {
    try {
      return await this.groupService.createGroup(createGroupDto);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to create group',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<GroupListResponseDto> {
    try {
      return await this.groupService.getAllGroups();
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to get groups',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GroupDetailResponseDto> {
    try {
      return await this.groupService.getGroupById(id);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to get group',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<GroupDetailResponseDto> {
    try {
      return await this.groupService.updateGroup(id, updateGroupDto);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to update group',
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
      await this.groupService.deleteGroup(id);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to delete group',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
