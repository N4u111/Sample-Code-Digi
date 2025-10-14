import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/microservice.interface';
export declare class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    private readonly logger;
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>>;
}
