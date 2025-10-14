import { IsString, IsEmail, IsInt, IsOptional, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(1)
  @Max(120)
  age: number;

  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(120)
  age?: number;

  @IsOptional()
  @IsString()
  password?: string;
}

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

export class GetUserByIdDto {
  @IsString()
  id: string;
}

export class AssignRoleToUserDto {
  @IsString()
  userId: string;

  @IsString()
  roleId: string;
}

export class RemoveRoleFromUserDto {
  @IsString()
  userId: string;

  @IsString()
  roleId: string;
}

export class GetUserRolesDto {
  @IsString()
  userId: string;
}

export class BulkAssignRolesToUserDto {
  @IsString()
  userId: string;

  @IsString({ each: true })
  roleIds: string[];
}