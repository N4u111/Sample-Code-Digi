import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
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