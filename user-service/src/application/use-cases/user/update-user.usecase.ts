import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { USER_REPOSITORY } from '../../../domain/tokens/user.tokens';
import { UpdateUserDto } from '../../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<User> {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Check if email is being updated and if it already exists
    if (dto.email && dto.email !== existingUser.email) {
      const emailExists = await this.userRepository.existsByEmail(dto.email);
      if (emailExists) {
        throw new ConflictException('User with this email already exists');
      }
    }

    // Create updated user entity
    let updatedUser = existingUser;

    if (dto.name) {
      updatedUser = updatedUser.updateName(dto.name);
    }

    if (dto.email) {
      updatedUser = updatedUser.updateEmail(dto.email);
    }

    if (dto.age) {
      updatedUser = updatedUser.updateAge(dto.age);
    }

    if (dto.password) {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      updatedUser = updatedUser.updatePassword(hashedPassword);
    }

    // Save updated user
    return await this.userRepository.update(id, updatedUser);
  }
}
