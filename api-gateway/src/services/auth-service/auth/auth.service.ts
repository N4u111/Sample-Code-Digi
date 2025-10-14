import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MicroserviceService } from '../../../shared/common/services/microservice.service';
import { USER_SERVICE } from '../../../shared/common/config/microservice.config';

@Injectable()
export class AuthService {
  constructor(private readonly microserviceService: MicroserviceService) {}

  async validateToken(tokenData: { token: string }) {
    try {
      // Call user-service to validate token
      const response = await this.microserviceService.sendRequest(
        USER_SERVICE,
        'auth.validate-token',
        tokenData,
        5000,
      );

      if (!response.success) {
        throw new UnauthorizedException('Invalid token');
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
