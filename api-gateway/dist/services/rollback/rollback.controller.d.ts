import { RollbackService } from './rollback.service';
export declare class RollbackController {
    private readonly rollbackService;
    constructor(rollbackService: RollbackService);
    rollback(rollbackData: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
