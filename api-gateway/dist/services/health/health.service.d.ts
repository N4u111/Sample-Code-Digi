export declare class HealthService {
    getHealthStatus(): {
        status: string;
        timestamp: string;
        uptime: number;
    };
    getDetailedHealthStatus(): {
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
