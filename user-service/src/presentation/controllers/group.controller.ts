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
import { CreateGroupUseCase } from '../../application/use-cases/group/create-group.usecase';
import { GetGroupByIdUseCase } from '../../application/use-cases/group/get-group-by-id.usecase';
import { GetAllGroupsUseCase } from '../../application/use-cases/group/get-all-groups.usecase';
import { UpdateGroupUseCase } from '../../application/use-cases/group/update-group.usecase';
import { DeleteGroupUseCase } from '../../application/use-cases/group/delete-group.usecase';
import {
  CreateGroupDto,
  UpdateGroupDto,
  GroupDetailResponseDto,
  GroupListResponseDto,
} from '../../application/dto/group.dto';

@Controller('groups')
export class GroupController {
  constructor(
    private readonly createGroupUseCase: CreateGroupUseCase,
    private readonly getGroupByIdUseCase: GetGroupByIdUseCase,
    private readonly getAllGroupsUseCase: GetAllGroupsUseCase,
    private readonly updateGroupUseCase: UpdateGroupUseCase,
    private readonly deleteGroupUseCase: DeleteGroupUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGroupDto: CreateGroupDto): Promise<GroupDetailResponseDto> {
    const group = await this.createGroupUseCase.execute(createGroupDto);
    
    return {
      success: true,
      message: 'Group created successfully',
      data: { group },
    };
  }

  @Get()
  async findAll(): Promise<GroupListResponseDto> {
    const groups = await this.getAllGroupsUseCase.execute();
    
    return {
      success: true,
      message: 'Groups retrieved successfully',
      data: {
        groups,
        total: groups.length,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GroupDetailResponseDto> {
    const group = await this.getGroupByIdUseCase.execute(id);
    
    return {
      success: true,
      message: 'Group retrieved successfully',
      data: { group },
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<GroupDetailResponseDto> {
    const group = await this.updateGroupUseCase.execute(id, updateGroupDto);
    
    return {
      success: true,
      message: 'Group updated successfully',
      data: { group },
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteGroupUseCase.execute(id);
  }
}
