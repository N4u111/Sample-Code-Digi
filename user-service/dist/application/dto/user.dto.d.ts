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
