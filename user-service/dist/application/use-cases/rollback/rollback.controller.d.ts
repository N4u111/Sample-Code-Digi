import { RollbackService } from './rollback.service';
export declare class RollbackController {
    private readonly rollbackService;
    constructor(rollbackService: RollbackService);
    restartService(data: any): Promise<any>;
    healthCheck(data: any): Promise<any>;
    getStatus(data: any): Promise<any>;
    rollbackOperation(data: any): Promise<any>;
    syncData(data: any): Promise<any>;
}
