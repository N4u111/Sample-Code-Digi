import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  slug?: string;
}

export class RoleResponseDto {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export class RoleListResponseDto {
  success: boolean;
  message: string;
  data: {
    roles: RoleResponseDto[];
    total: number;
  };
}

export class RoleDetailResponseDto {
  success: boolean;
  message: string;
  data: {
    role: RoleResponseDto;
  };
}
