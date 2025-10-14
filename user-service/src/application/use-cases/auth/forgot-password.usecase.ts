import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { USER_REPOSITORY } from '../../../domain/tokens/user.tokens';
import { ForgotPasswordDto } from '../../dto/auth.dto';
import * as crypto from 'crypto';

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: ForgotPasswordDto): Promise<{ success: boolean; message: string }> {
    // Find user by email
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      // Don't reveal if email exists or not for security
      return {
        success: true,
        message: 'If the email exists, a password reset link has been sent',
      };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // In a real application, you would:
    // 1. Save the reset token to database
    // 2. Send email with reset link
    // 3. Store token with expiry time

    // For now, we'll just log the token (in production, send email)
    console.log(`Password reset token for ${dto.email}: ${resetToken}`);
    console.log(`Token expires at: ${resetTokenExpiry}`);

    return {
      success: true,
      message: 'If the email exists, a password reset link has been sent',
    };
  }
}
