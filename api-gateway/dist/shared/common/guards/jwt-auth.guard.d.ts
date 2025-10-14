import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../../../services/auth-service/auth/auth.service';
export declare class JwtAuthGuard implements CanActivate {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
