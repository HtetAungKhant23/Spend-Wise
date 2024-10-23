import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrentUser, IAuthUser } from '@app/core/decorators/auth.decorators';
import { ExceptionConstants } from '@app/core/exceptions/constants';
import { BadRequestException } from '@app/core/exceptions/bad-request.exception';
import { AccountService } from './account.service';
import { IAccountService } from './interface/account-service.interface';
import { UserAuthGuard } from '../auth/guard/user.auth.guard';
import { AccountDto } from './dto/account.dto';
import { EditAccountDto } from './dto/edit-account.dto';

@ApiTags('Account')
@Controller({ version: '1' })
export class AccountController {
  constructor(@Inject(AccountService) private accountService: IAccountService) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  @ApiBody({ type: AccountDto, description: 'Create account' })
  async create(@CurrentUser() user: IAuthUser, @Body() dto: AccountDto) {
    try {
      await this.accountService.create(user.id, dto);
      return {
        _data: {},
        _metadata: {
          message: 'Account successfully created',
          statusCode: HttpStatus.CREATED,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
        cause: new Error(err),
        code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
        description: 'Failed to create account',
      });
    }
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  async get(@CurrentUser() user: IAuthUser) {
    try {
      const accounts = await this.accountService.get(user.id);
      return {
        _data: accounts,
        _metadata: {
          message: 'Account successfully fetched',
          statusCode: HttpStatus.OK,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
        cause: new Error(err),
        code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
        description: 'Failed to fetch account',
      });
    }
  }

  // @Get(':id')
  // @ApiBearerAuth()
  // @UseGuards(UserAuthGuard)
  // @ApiParam({ type: String, name: 'id' })
  // async getDetail(@CurrentUser() user: IAuthUser, @Param('id') id: string) {
  //   try {
  //     const accounts = await this.accountService.getDetail(user.id, id);
  //     return {
  //       _data: accounts,
  //       _metadata: {
  //         message: 'Account successfully fetched',
  //         statusCode: HttpStatus.OK,
  //       },
  //     };
  //   } catch (err) {
  //     throw new BadRequestException({
  //       message: err.message,
  //       cause: new Error(err),
  //       code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
  //       description: 'Failed to fetch account',
  //     });
  //   }
  // }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  @ApiBody({ type: EditAccountDto, description: 'Edit Account' })
  async edit(@Param('id') accountId: string, @Body() dto: EditAccountDto) {
    try {
      await this.accountService.edit(accountId, dto.name);
      return {
        _data: {},
        _metadata: {
          message: 'Account successfully edited',
          statusCode: HttpStatus.NO_CONTENT,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
        cause: new Error(err),
        code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
        description: 'Failed to edit account',
      });
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  async delete(@Param('id') accountId: string) {
    try {
      await this.accountService.delete(accountId);
      return {
        _data: {},
        _metadata: {
          message: 'Account successfully deleted',
          statusCode: HttpStatus.NO_CONTENT,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
        cause: new Error(err),
        code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
        description: 'Failed to delete account',
      });
    }
  }
}
