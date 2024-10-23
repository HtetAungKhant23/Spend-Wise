import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/shared/prisma/prisma.service';
import { BadRequestException } from '@app/core/exceptions/bad-request.exception';
import { ExceptionConstants } from '@app/core/exceptions/constants';
import { ICategoryService } from './interface/category.interface';
import { CategoryDto } from './dto/category.dto';
import { CategoryEntity } from './entity/category.entity';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(private readonly dbService: PrismaService) {}

  async create(dto: CategoryDto, userId: string): Promise<CategoryEntity> {
    const existCategory = await this.dbService.category.findFirst({
      where: {
        name: dto.name,
        userId,
        isPrivate: true,
        isDeleted: false,
      },
    });

    if (existCategory) {
      throw new BadRequestException({
        message: `Category already exist`,
        code: ExceptionConstants.BadRequestCodes.RESOURCE_ALREADY_EXISTS,
      });
    }

    const category = await this.dbService.category.create({
      data: {
        name: dto.name,
        icon: dto?.icon,
        isPrivate: dto.private,
        ...(dto.private && { userId }),
      },
    });

    return new CategoryEntity(category.id, category.name, category?.icon, category.isPrivate);
  }

  async get(userId: string): Promise<CategoryEntity[]> {
    const categories = await this.dbService.category.findMany({
      where: {
        isDeleted: false,
        OR: [
          {
            userId: null,
          },
          {
            userId,
          },
        ],
      },
    });

    return categories.map((category) => {
      return new CategoryEntity(category.id, category.name, category?.icon, category.isPrivate);
    });
  }

  async delete(userId: string, categoryId: string): Promise<void> {
    const existCategory = await this.dbService.category.findUnique({
      where: {
        id: categoryId,
        userId,
        isPrivate: true,
        isDeleted: false,
      },
    });

    if (!existCategory) {
      throw new BadRequestException({
        message: `Category not found`,
        code: ExceptionConstants.BadRequestCodes.RESOURCE_NOT_FOUND,
      });
    }

    await this.dbService.category.update({
      where: {
        id: existCategory.id,
      },
      data: {
        name: `deleted-${existCategory.name}-${Date.now()}`,
        isDeleted: true,
      },
    });
  }
}
