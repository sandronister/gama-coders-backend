import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './middleware/AllException.filter';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      database: 'data.sqlite',
      synchronize: true
    }),
    TransactionModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
