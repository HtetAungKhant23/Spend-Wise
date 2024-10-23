import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ExceptionConstants } from '@app/core/exceptions/constants';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CloudinaryService } from '@app/shared/upload/cloudinary.service';
import { CurrentUser, IAuthUser } from '@app/core/decorators/auth.decorators';
import { TransactionService } from './transaction.service';
import { ITransactionService } from './interface/transaction-service.interface';
import { TransactionDto } from './dto/transaction.dto';
import { UserAuthGuard } from '../auth/guard/user.auth.guard';

@ApiTags('Transaction')
@Controller({ version: '1' })
export class TransactionController {
  constructor(
    @Inject(TransactionService) private transactionService: ITransactionService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  @ApiBody({ type: TransactionDto, description: 'Create Transaction' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          return cb(null, `${uuidv4()}.${file.originalname}`);
        },
      }),
    }),
  )
  async create(@Body() dto: TransactionDto, @UploadedFile() file: Express.Multer.File) {
    try {
      let url;
      if (file) {
        url = await this.cloudinaryService.uploadImage(file.path, 'transaction');
        // to delete file in uploads folder
      }
      await this.transactionService.create(dto, url);
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

  @Get('')
  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  async get(@CurrentUser() user: IAuthUser) {
    try {
      const transactions = await this.transactionService.get(user.id);
      return {
        _data: transactions,
        _metadata: {
          message: 'Transactions successfully fetched',
          statusCode: HttpStatus.OK,
        },
      };
    } catch (err) {
      throw new BadRequestException({
        message: err.message,
        cause: new Error(err),
        code: ExceptionConstants.BadRequestCodes.UNEXPECTED_ERROR,
        description: 'Failed to fetch transaction',
      });
    }
  }
}
