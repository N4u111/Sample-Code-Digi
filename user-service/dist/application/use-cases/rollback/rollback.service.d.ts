export declare class RollbackService {
    private readonly logger;
    handleRollbackCommand(command: string, data?: any): Promise<any>;
    private restartService;
    private healthCheck;
    private getStatus;
    private rollbackOperation;
    private syncData;
}
