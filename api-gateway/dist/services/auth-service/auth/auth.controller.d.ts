import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    validateToken(tokenData: {
        token: string;
    }): Promise<import("../../../shared/common/interfaces/microservice.interface").ApiResponse<unknown>>;
}
