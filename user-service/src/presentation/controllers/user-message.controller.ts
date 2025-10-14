import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.usecase';
import { GetUserByIdUseCase } from '../../application/use-cases/user/get-user-by-id.usecase';
import { GetAllUsersUseCase } from '../../application/use-cases/user/get-all-users.usecase';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.usecase';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.usecase';
import { CreateUserDto, UpdateUserDto } from '../../application/dto/user.dto';

@Controller()
export class UserMessageController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @MessagePattern('user.create')
  async create(@Payload() data: CreateUserDto) {
    try {
      const user = await this.createUserUseCase.execute(data);
      return {
        success: true,
        message: 'User created successfully',
        data: user.toJSON(),
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.message,
      };
    }
  }

  @MessagePattern('user.findAll')
  async findAll() {
    try {
      const users = await this.getAllUsersUseCase.execute();
      return {
        success: true,
        message: 'Users retrieved successfully',
        data: users.map(user => user.toJSON()),
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.message,
      };
    }
  }

  @MessagePattern('user.findById')
  async findById(@Payload() data: { id: string }) {
    try {
      const user = await this.getUserByIdUseCase.execute(data.id);
      return {
        success: true,
        message: 'User retrieved successfully',
        data: user.toJSON(),
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.message,
      };
    }
  }

  @MessagePattern('user.update')
  async update(@Payload() data: { id: string; updateData: UpdateUserDto }) {
    try {
      const user = await this.updateUserUseCase.execute(data.id, data.updateData);
      return {
        success: true,
        message: 'User updated successfully',
        data: user.toJSON(),
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.message,
      };
    }
  }

  @MessagePattern('user.delete')
  async delete(@Payload() data: { id: string }) {
    try {
      await this.deleteUserUseCase.execute(data.id);
      return {
        success: true,
        message: 'User deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error.message,
      };
    }
  }

  @MessagePattern('user.test')
  async test() {
    return {
      success: true,
      message: 'Test message from RabbitMQ',
      timestamp: new Date().toISOString(),
    };
  }
}
