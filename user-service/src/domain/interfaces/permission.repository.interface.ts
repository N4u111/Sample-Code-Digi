import { Permission } from '../entities/permission.entity';

export interface PermissionRepository {
  create(permission: Permission): Promise<Permission>;
  findById(id: string): Promise<Permission | null>;
  findByName(name: string): Promise<Permission | null>;
  findByCode(code: string): Promise<Permission | null>;
  findAll(): Promise<Permission[]>;
  update(id: string, permission: Permission): Promise<Permission>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
  existsByCode(code: string): Promise<boolean>;
}
