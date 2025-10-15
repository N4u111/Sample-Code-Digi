import { Role } from '../entities/role.entity';

export interface RoleRepository {
  create(role: Role): Promise<Role>;
  findById(id: string): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  findBySlug(slug: string): Promise<Role | null>;
  findAll(): Promise<Role[]>;
  update(id: string, role: Role): Promise<Role>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
  existsBySlug(slug: string): Promise<boolean>;
}
