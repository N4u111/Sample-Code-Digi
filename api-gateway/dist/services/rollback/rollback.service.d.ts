export declare class RollbackService {
    executeRollback(rollbackData: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
