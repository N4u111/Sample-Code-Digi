export declare class CreateRoleDto {
    name: string;
    slug: string;
}
export declare class UpdateRoleDto {
    name?: string;
    slug?: string;
}
export declare class GetRoleByIdDto {
    id: string;
}
export declare class RoleResponseDto {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}
