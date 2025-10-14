import { HealthService } from './health.service';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    check(): {
        status: string;
        timestamp: string;
        uptime: number;
    };
    detailedCheck(): {
        status: string;
        timestamp: string;
        uptime: number;
        memory: NodeJS.MemoryUsage;
        version: string;
        platform: NodeJS.Platform;
        services: {
            apiGateway: string;
            userService: string;
            rabbitmq: string;
        };
    };
}
