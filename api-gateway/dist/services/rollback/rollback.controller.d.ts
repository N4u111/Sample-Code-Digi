import { RollbackService } from './rollback.service';
export declare class RollbackController {
    private readonly rollbackService;
    constructor(rollbackService: RollbackService);
    restartUserService(): Promise<any>;
    checkUserServiceHealth(): Promise<any>;
    getUserServiceStatus(): Promise<any>;
    rollbackUserOperation(data: any): Promise<any>;
    syncDataWithUserService(data: any): Promise<any>;
}
