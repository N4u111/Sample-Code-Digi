import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check() {
    return this.healthService.getHealthStatus();
  }

  @Get('detailed')
  detailedCheck() {
    return this.healthService.getDetailedHealthStatus();
  }
}
