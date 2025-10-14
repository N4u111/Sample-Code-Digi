import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RollbackService } from './rollback.service';

@Controller()
export class RollbackController {
  constructor(private readonly rollbackService: RollbackService) {}

  @MessagePattern('user.service.restart')
  async restartService(@Payload() data: any): Promise<any> {
    return this.rollbackService.handleRollbackCommand('restart', data);
  }

  @MessagePattern('user.service.health')
  async healthCheck(@Payload() data: any): Promise<any> {
    return this.rollbackService.handleRollbackCommand('health', data);
  }

  @MessagePattern('user.service.status')
  async getStatus(@Payload() data: any): Promise<any> {
    return this.rollbackService.handleRollbackCommand('status', data);
  }

  @MessagePattern('user.rollback')
  async rollbackOperation(@Payload() data: any): Promise<any> {
    return this.rollbackService.handleRollbackCommand('rollback', data);
  }

  @MessagePattern('user.sync')
  async syncData(@Payload() data: any): Promise<any> {
    return this.rollbackService.handleRollbackCommand('sync', data);
  }
}
