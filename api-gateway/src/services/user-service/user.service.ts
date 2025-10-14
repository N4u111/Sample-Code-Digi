import { Injectable, Logger } from '@nestjs/common';
import { MicroserviceService } from '../../shared/common/services/microservice.service';
import { USER_SERVICE } from '../../shared/common/config/microservice.config';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../../shared/common/dto/user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly microserviceService: MicroserviceService) {}

  async test(): Promise<string> {
    this.logger.log('Testing user service');
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'user.create',
      {},
      10000, // 10 second timeout
    );

    if (!response.success) {
      throw new Error(`Failed to create user: ${response.message}`);
    }

    return response.message;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    this.logger.log('Creating user via User Service');
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'user.create',
      createUserDto,
      10000, // 10 second timeout
    );

    if (!response.success) {
      throw new Error(`Failed to create user: ${response.message}`);
    }

    return response.data as UserResponseDto;
  }

  async getAllUsers(): Promise<UserResponseDto[]> {
    this.logger.log('Getting all users via User Service');
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'user.findAll',
      {},
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to get users: ${response.message}`);
    }

    return response.data as UserResponseDto[];
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    this.logger.log(`Getting user by ID: ${id} via User Service`);
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'user.findById',
      { id },
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to get user: ${response.message}`);
    }

    return response.data as UserResponseDto;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    this.logger.log(`Updating user ID: ${id} via User Service`);
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'user.update',
      { id, updateData: updateUserDto },
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to update user: ${response.message}`);
    }

    return response.data as UserResponseDto;
  }

  async deleteUser(id: string): Promise<void> {
    this.logger.log(`Deleting user ID: ${id} via User Service`);
    
    const response = await this.microserviceService.sendRequest(
      USER_SERVICE,
      'user.delete',
      { id },
      10000,
    );

    if (!response.success) {
      throw new Error(`Failed to delete user: ${response.message}`);
    }
  }
}
