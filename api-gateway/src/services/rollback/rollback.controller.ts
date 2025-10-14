import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RollbackService } from './rollback.service';

@Controller('rollback')
export class RollbackController {
  constructor(private readonly rollbackService: RollbackService) {}

  @Post('user-service/restart')
  async restartUserService() {
    return this.rollbackService.restartUserService();
  }

  @Get('user-service/health')
  async checkUserServiceHealth() {
    return this.rollbackService.checkUserServiceHealth();
  }

  @Get('user-service/status')
  async getUserServiceStatus() {
    return this.rollbackService.getUserServiceStatus();
  }

  @Post('user-service/rollback-operation')
  async rollbackUserOperation(@Body() data: any) {
    return this.rollbackService.rollbackUserOperation(data);
  }

  @Post('user-service/sync-data')
  async syncDataWithUserService(@Body() data: any) {
    return this.rollbackService.syncDataWithUserService(data);
  }
}
