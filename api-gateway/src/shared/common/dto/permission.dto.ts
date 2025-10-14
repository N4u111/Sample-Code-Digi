import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

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

export class GetPermissionByIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class PermissionResponseDto {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}
