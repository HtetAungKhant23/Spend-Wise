import { BadRequestException, Controller, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ExceptionConstants } from '@app/core/exceptions/constants';
import { TransactionService } from './transaction.service';
import { ITransactionService } from './interface/transaction-service.interface';
import { TransactionDto } from './dto/transaction.dto';
import { UserAuthGuard } from '../auth/guard/user.auth.guard';

@ApiTags('Transaction')
@Controller({ version: '1' })
export class TransactionController {
  constructor(@Inject(TransactionService) private transactionService: ITransactionService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  @ApiBody({ type: TransactionDto, description: 'Create Transaction' })
  async create(dto: TransactionDto) {
    try {
      await this.transactionService.create(dto);
      return {
        _data: {},
        _metadata: {
          message: 'Transaction successfully created',
          statusCode: HttpStatus.CREATED,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
        cause: new Error(err),
        code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
        description: 'Failed to create transaction',
      });
    }
  }
}
