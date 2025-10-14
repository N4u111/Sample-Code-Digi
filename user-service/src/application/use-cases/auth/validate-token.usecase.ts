import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { USER_REPOSITORY } from '../../../domain/tokens/user.tokens';
import { TokenValidationDto, TokenValidationResponseDto } from '../../dto/auth.dto';
import jwt from 'jsonwebtoken';

@Injectable()
export class ValidateTokenUseCase {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: TokenValidationDto): Promise<TokenValidationResponseDto> {
    try {
      // Verify JWT token
      const decoded = jwt.verify(dto.token, this.JWT_SECRET) as any;

      // Check if token type is access token
      if (decoded.type !== 'access') {
        return {
          success: true,
          message: 'Token validation result',
          data: {
            valid: false,
          },
        };
      }

      // Find user by ID from token
      const user = await this.userRepository.findById(decoded.userId);
      if (!user) {
        return {
          success: true,
          message: 'Token validation result',
          data: {
            valid: false,
          },
        };
      }

      return {
        success: true,
        message: 'Token validation result',
        data: {
          valid: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            age: user.age,
          },
        },
      };
    } catch (error) {
      // Token is invalid or expired
      return {
        success: true,
        message: 'Token validation result',
        data: {
          valid: false,
        },
      };
    }
  }
}
