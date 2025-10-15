import { Group } from '../entities/group.entity';

export interface GroupRepository {
  create(group: Group): Promise<Group>;
  findById(id: string): Promise<Group | null>;
  findByName(name: string): Promise<Group | null>;
  findBySlug(slug: string): Promise<Group | null>;
  findAll(): Promise<Group[]>;
  update(id: string, group: Group): Promise<Group>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
  existsBySlug(slug: string): Promise<boolean>;
}
