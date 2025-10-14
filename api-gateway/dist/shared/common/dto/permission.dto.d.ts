export declare class CreatePermissionDto {
    name: string;
    code: string;
}
export declare class UpdatePermissionDto {
    name?: string;
    code?: string;
}
export declare class GetPermissionByIdDto {
    id: string;
}
export declare class PermissionResponseDto {
    id: string;
    name: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
}
