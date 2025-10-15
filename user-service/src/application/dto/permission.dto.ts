import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}

export class UpdatePermissionDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  code?: string;
}

export class PermissionResponseDto {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PermissionListResponseDto {
  success: boolean;
  message: string;
  data: {
    permissions: PermissionResponseDto[];
    total: number;
  };
}

export class PermissionDetailResponseDto {
  success: boolean;
  message: string;
  data: {
    permission: PermissionResponseDto;
  };
}
