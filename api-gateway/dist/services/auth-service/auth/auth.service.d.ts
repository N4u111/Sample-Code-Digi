import { MicroserviceService } from '../../../shared/common/services/microservice.service';
import { ApiResponse } from '../../../shared/common/interfaces/microservice.interface';
export interface ValidateTokenDto {
    token: string;
}
export interface UserData {
    id: string;
    email: string;
    name: string;
}
export declare class AuthService {
    private readonly microserviceService;
    private readonly logger;
    constructor(microserviceService: MicroserviceService);
    validateToken(validateTokenDto: ValidateTokenDto): Promise<ApiResponse<UserData>>;
}
