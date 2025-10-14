export declare class CreateGroupDto {
    name: string;
    slug: string;
}
export declare class UpdateGroupDto {
    name?: string;
    slug?: string;
}
export declare class GetGroupByIdDto {
    id: string;
}
export declare class GroupResponseDto {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}
