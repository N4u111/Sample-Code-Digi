import { Controller, Post, Body } from '@nestjs/common';
import { RollbackService } from './rollback.service';

@Controller('rollback')
export class RollbackController {
  constructor(private readonly rollbackService: RollbackService) {}

  @Post()
  async rollback(@Body() rollbackData: any) {
    return await this.rollbackService.executeRollback(rollbackData);
  }
}
