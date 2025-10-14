import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.usecase';
import { GetUserByIdUseCase } from '../../application/use-cases/user/get-user-by-id.usecase';
import { GetAllUsersUseCase } from '../../application/use-cases/user/get-all-users.usecase';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.usecase';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.usecase';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../../application/dto/user.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @MessagePattern('user.test')
  @Get('test')
  async test() {
    return {
      message: 'Test message',
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.createUserUseCase.execute(createUserDto);
    return user.toJSON();
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.getAllUsersUseCase.execute();
    return users.map(user => user.toJSON());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.getUserByIdUseCase.execute(id);
    return user.toJSON();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.updateUserUseCase.execute(id, updateUserDto);
    return user.toJSON();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }
}
