import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TransactionEntity } from 'src/entity';
import { TransactionInterface } from './transaction.interface';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {

    constructor(private readonly service: TransactionService) { }

    @Get()
    async list(): Promise<TransactionEntity[]> {
        return await this.service.findAll()
    }

    @Get('/:id')
    async show(@Param('id') id: number): Promise<TransactionEntity> {
        return await this.service.find(id)
    }

    @Post()
    async create(@Body() transaction: TransactionInterface): Promise<TransactionInterface> {        
        return await this.service.create(transaction, 3)
    }

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<any> {
        await this.service.delete(id)
        return { message: 'ok' }
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() transaction: TransactionInterface): Promise<any> {       
        await this.service.update(id, transaction)
        return { message: 'ok' }
    }

}
