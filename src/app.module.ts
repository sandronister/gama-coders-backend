import { TransactionModule } from './transaction/transaction.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      database: 'data.sqlite'
    }),
    TransactionModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
