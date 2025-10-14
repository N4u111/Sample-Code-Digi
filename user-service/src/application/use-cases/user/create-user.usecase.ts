import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { USER_REPOSITORY } from '../../../domain/tokens/user.tokens';
import { CreateUserDto } from '../../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    // Check if user with email already exists
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create user entity
    const user = User.create(
      require('crypto').randomUUID(),
      dto.name,
      dto.email,
      dto.age,
      hashedPassword,
    );

    // Save user
    return await this.userRepository.create(user);
  }
}
