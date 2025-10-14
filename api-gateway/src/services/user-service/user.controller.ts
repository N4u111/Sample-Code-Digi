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
  HttpException,
  HttpCode as HttpCodeDecorator
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../../shared/common/dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCodeDecorator(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to create user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to get users',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('test')
  async test(): Promise<string> {
    try {
      return await this.userService.test();
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to test',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to get user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    try {
      return await this.userService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to update user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCodeDecorator(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Failed to delete user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
