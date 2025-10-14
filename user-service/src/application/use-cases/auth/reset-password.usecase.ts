import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { USER_REPOSITORY } from '../../../domain/tokens/user.tokens';
import { ResetPasswordDto } from '../../dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: ResetPasswordDto): Promise<{ success: boolean; message: string }> {
    // In a real application, you would:
    // 1. Validate the reset token
    // 2. Check if token is not expired
    // 3. Find user by token
    // 4. Update password

    // For this example, we'll simulate token validation
    if (!this.isValidResetToken(dto.token)) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Simulate finding user by token (in real app, you'd query by token)
    // For demo purposes, we'll use a mock user ID
    const userId = this.extractUserIdFromToken(dto.token);
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    // Update user password
    const updatedUser = user.updatePassword(hashedPassword);
    await this.userRepository.update(userId, updatedUser);

    return {
      success: true,
      message: 'Password has been reset successfully',
    };
  }

  private isValidResetToken(token: string): boolean {
    // In a real application, you would:
    // 1. Check if token exists in database
    // 2. Check if token is not expired
    // 3. Validate token format
    
    // For demo purposes, we'll accept any token that's 64 characters long
    return token && token.length === 64;
  }

  private extractUserIdFromToken(token: string): string {
    // In a real application, you would extract user ID from the token
    // For demo purposes, we'll return a mock user ID
    // In production, you'd decode the token or query the database
    
    // This is just for demonstration - in real app, you'd have proper token handling
    return 'mock-user-id';
  }
}
