export declare class CreateUserDto {
    name: string;
    email: string;
    age: number;
    password: string;
}
export declare class UpdateUserDto {
    name?: string;
    email?: string;
    age?: number;
    password?: string;
}
export declare class UserResponseDto {
    id: string;
    name: string;
    email: string;
    age: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class GetUserByIdDto {
    id: string;
}
export declare class AssignRoleToUserDto {
    userId: string;
    roleId: string;
}
export declare class RemoveRoleFromUserDto {
    userId: string;
    roleId: string;
}
export declare class GetUserRolesDto {
    userId: string;
}
export declare class BulkAssignRolesToUserDto {
    userId: string;
    roleIds: string[];
}
