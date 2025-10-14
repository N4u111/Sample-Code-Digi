import { MicroserviceService } from '../../shared/common/services/microservice.service';
import { ApiResponse } from '../../shared/common/interfaces/microservice.interface';
export declare class HealthService {
    private readonly microserviceService;
    private readonly logger;
    constructor(microserviceService: MicroserviceService);
    checkMicroservices(): Promise<{
        apiGateway: {
            status: string;
            timestamp: string;
        };
        authService: ApiResponse;
        userService: ApiResponse;
    }>;
    private checkService;
}
