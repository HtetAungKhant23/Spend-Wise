import { Module } from '@nestjs/common';
import { CloudinaryService } from '@app/shared/upload/cloudinary.service';
import { TransactionController } from '../transaction/transaction.controller';
import { TransactionService } from '../transaction/transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, CloudinaryService],
  exports: [TransactionService],
})
export class RoutesTransactionModule {}
