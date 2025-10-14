import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { USER_REPOSITORY } from '../../../domain/tokens/user.tokens';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    // Check if user exists
    const userExists = await this.userRepository.exists(id);
    if (!userExists) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Delete user
    await this.userRepository.delete(id);
  }
}
