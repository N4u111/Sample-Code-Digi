import { MicroserviceConfig } from '../interfaces/microservice.interface';
export declare const MICROSERVICE_CONFIGS: Record<string, MicroserviceConfig>;
export declare const RABBITMQ_CONFIG: {
    url: string;
    queue: {
        user: string;
    };
    exchange: {
        user: string;
    };
    routingKey: {
        user: string;
    };
};
export declare const USER_SERVICE = "USER_SERVICE";
export declare const getMicroserviceConfig: (serviceName: string) => MicroserviceConfig;
