import { MicroserviceService } from '../../shared/common/services/microservice.service';
export declare class RollbackService {
    private readonly microserviceService;
    private readonly logger;
    constructor(microserviceService: MicroserviceService);
    restartUserService(): Promise<any>;
    checkUserServiceHealth(): Promise<any>;
    getUserServiceStatus(): Promise<any>;
    rollbackUserOperation(data: any): Promise<any>;
    syncDataWithUserService(data: any): Promise<any>;
}
