import { Body, Controller, Get, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
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
      await this.categoryService.create(dto, user.id);
      return {
        _data: {},
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
          statusCode: HttpStatus.CREATED,
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
}
