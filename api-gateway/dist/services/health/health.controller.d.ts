import { HealthService } from './health.service';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    getHealth(): Promise<{
        apiGateway: {
            status: string;
            timestamp: string;
        };
        authService: import("../../shared/common/interfaces/microservice.interface").ApiResponse;
        userService: import("../../shared/common/interfaces/microservice.interface").ApiResponse;
    }>;
    getSimpleHealth(): Promise<{
        status: string;
        service: string;
        timestamp: string;
    }>;
}
