export interface AuthenticatedUser {
    userId: string;
    email: string;
    iat?: number;
    exp?: number;
}
export declare const Auth: (...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | keyof AuthenticatedUser)[]) => ParameterDecorator;
