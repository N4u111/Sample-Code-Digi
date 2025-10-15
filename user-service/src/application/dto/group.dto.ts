import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}

export class UpdateGroupDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  slug?: string;
}

export class GroupResponseDto {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export class GroupListResponseDto {
  success: boolean;
  message: string;
  data: {
    groups: GroupResponseDto[];
    total: number;
  };
}

export class GroupDetailResponseDto {
  success: boolean;
  message: string;
  data: {
    group: GroupResponseDto;
  };
}
