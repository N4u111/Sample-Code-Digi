import { MicroserviceService } from '../../../shared/common/services/microservice.service';
export declare class AuthService {
    private readonly microserviceService;
    constructor(microserviceService: MicroserviceService);
    validateToken(tokenData: {
        token: string;
    }): Promise<import("../../../shared/common/interfaces/microservice.interface").ApiResponse<unknown>>;
}
