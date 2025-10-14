import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('info')
  getInfo(): object {
    return {
      service: 'API Gateway',
      version: '1.0.0',
      description: 'NestJS Microservices API Gateway',
      endpoints: {
        users: '/users/*',
        health: '/health/*',
        rollback: '/rollback/*',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
