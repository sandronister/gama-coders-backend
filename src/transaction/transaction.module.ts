import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TransactionEntity])
    ],
    controllers: [
        TransactionController,],
    providers: [
        TransactionService,],
})
export class TransactionModule { }
