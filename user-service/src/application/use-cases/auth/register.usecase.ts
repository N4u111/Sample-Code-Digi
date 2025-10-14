import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { USER_REPOSITORY } from '../../../domain/tokens/user.tokens';
import { RegisterDto, AuthResponseDto } from '../../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class RegisterUseCase {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
  private readonly REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: RegisterDto): Promise<AuthResponseDto> {
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
    const savedUser = await this.userRepository.create(user);

    // Generate tokens
    const accessToken = this.generateAccessToken(savedUser);
    const refreshToken = this.generateRefreshToken(savedUser);

    return {
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
          age: savedUser.age,
        },
        accessToken,
        refreshToken,
        expiresIn: 3600, // 1 hour in seconds
      },
    };
  }

  private generateAccessToken(user: User): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        type: 'access',
      },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN } as jwt.SignOptions,
    );
  }

  private generateRefreshToken(user: User): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        type: 'refresh',
      },
      this.JWT_SECRET,
      { expiresIn: this.REFRESH_TOKEN_EXPIRES_IN } as jwt.SignOptions,
    );
  }
}
