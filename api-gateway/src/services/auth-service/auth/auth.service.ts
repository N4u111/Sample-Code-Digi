import { Injectable, Logger } from '@nestjs/common';
import { MicroserviceService } from '../../../shared/common/services/microservice.service';
import { ApiResponse } from '../../../shared/common/interfaces/microservice.interface';

export interface ValidateTokenDto {
  token: string;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly microserviceService: MicroserviceService) {}

  async validateToken(validateTokenDto: ValidateTokenDto): Promise<ApiResponse<UserData>> {
    this.logger.log('Validating token with auth microservice');
    
    try {
      const response = await this.microserviceService.sendRequest(
        'AUTH_SERVICE',
        'auth.validateToken',
        validateTokenDto,
        5000, // 5 second timeout
      );

      if (!response.success) {
        this.logger.warn(`Token validation failed: ${response.message}`);
        return {
          success: false,
          message: response.message || 'Token validation failed',
          data: undefined,
        };
      }

      return {
        success: true,
        message: 'Token validated successfully',
        data: response.data as UserData,
      };
    } catch (error) {
      this.logger.error('Error validating token:', error.message);
      return {
        success: false,
        message: 'Token validation error',
        data: undefined,
      };
    }
  }
}
