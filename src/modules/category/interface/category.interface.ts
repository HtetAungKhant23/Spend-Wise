import { CategoryDto } from '../dto/category.dto';
import { CategoryEntity } from '../entity/category.entity';

export interface ICategoryService {
  create(dto: CategoryDto, userId: string): Promise<CategoryEntity>;
  get(userId: string): Promise<CategoryEntity[]>;
  delete(userId: string, categoryId: string): Promise<void>;
}
