import { Injectable, Logger } from '@nestjs/common';
import { MicroserviceService } from '../../shared/common/services/microservice.service';
import { ApiResponse } from '../../shared/common/interfaces/microservice.interface';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private readonly microserviceService: MicroserviceService) {}

  async checkMicroservices(): Promise<{
    apiGateway: { status: string; timestamp: string };
    authService: ApiResponse;
    userService: ApiResponse;
  }> {
    const results = {
      apiGateway: {
        status: 'ok',
        timestamp: new Date().toISOString(),
      },
      authService: await this.checkService('AUTH_SERVICE', 'auth.health'),
      userService: await this.checkService('USER_SERVICE', 'user.health'),
    };

    this.logger.log('Health check completed', results);
    return results;
  }

  private async checkService(serviceName: string, pattern: string): Promise<ApiResponse> {
    try {
      const response = await this.microserviceService.sendRequest(
        serviceName,
        pattern,
        {},
        2000, // 2 second timeout for health checks
      );
      
      return {
        success: response.success,
        message: response.message,
        data: response.data,
      };
    } catch (error) {
      this.logger.error(`Health check failed for ${serviceName}: ${error.message}`);
      return {
        success: false,
        message: `Service ${serviceName} is not responding`,
        error: error.message,
      };
    }
  }
}
