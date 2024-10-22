import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { BadRequestException } from '@app/core/exceptions/bad-request.exception';
import { ExceptionConstants } from '@app/core/exceptions/constants';
import { CurrentUser, IAuthUser } from '@app/core/decorators/auth.decorators';
import { CategoryService } from './category.service';
import { ICategoryService } from './interface/category.interface';
import { CategoryDto } from './dto/category.dto';
import { UserAuthGuard } from '../auth/guard/user.auth.guard';

@ApiTags('Category')
@Controller({ version: '1' })
export class CategoryController {
  constructor(@Inject(CategoryService) private categoryService: ICategoryService) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  @ApiBody({ type: CategoryDto, description: 'Create category' })
  async create(@Body() dto: CategoryDto, @CurrentUser() user: IAuthUser) {
    try {
      const category = await this.categoryService.create(dto, user.id);
      return {
        _data: category,
        _metadata: {
          message: 'Category successfully created',
          statusCode: HttpStatus.CREATED,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
        cause: new Error(err),
        code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
        description: 'Failed to create category',
      });
    }
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  async get(@CurrentUser() user: IAuthUser) {
    try {
      const categories = await this.categoryService.get(user.id);
      return {
        _data: categories,
        _metadata: {
          message: 'Category successfully fetched',
          statusCode: HttpStatus.OK,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
        cause: new Error(err),
        code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
        description: 'Failed to fetch category',
      });
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  @ApiParam({ type: String, name: 'id' })
  async delete(@CurrentUser() user: IAuthUser, @Param('id') categoryId: string) {
    try {
      await this.categoryService.delete(user.id, categoryId);
      return {
        _data: {},
        _metadata: {
          message: 'Category successfully deleted',
          statusCode: HttpStatus.NO_CONTENT,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
        cause: new Error(err),
        code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
        description: 'Failed to delete category',
      });
    }
  }
}
