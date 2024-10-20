import { Body, Controller, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrentUser, IAuthUser } from '@app/core/decorators/auth.decorators';
import { BadRequestException } from '@app/core/exceptions/bad-request.exception';
import { ExceptionConstants } from '@app/core/exceptions/constants';
import { AccountService } from './account.service';
import { IAccountService } from './interface/account-service.interface';
import { UserAuthGuard } from '../auth/guard/user.auth.guard';
import { AccountDto } from './dto/account.dto';

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
}
