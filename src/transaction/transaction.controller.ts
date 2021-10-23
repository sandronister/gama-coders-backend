import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TransactionEntity } from 'src/entity';
import { TransactionInterface } from './transaction.interface';
import { TransactionService } from './transaction.service';

@Controller()
export class TransactionController {

    constructor(private readonly service: TransactionService) { }

    @Get()
    async list(): Promise<TransactionEntity[]> {
        return await this.service.findAll()
    }

    @Get('/:id')
    async show(id: number): Promise<TransactionEntity> {
        return await this.service.find(id)
    }

    @Post()
    create(transaction: TransactionInterface): Promise<void> {
        return null
    }

    @Delete('/:id')
    async delete(id: number): Promise<any> {
        await this.service.delete(id)
        return { message: 'ok' }
    }

    @Put('/:id')
    async update(id: number, transaction: TransactionInterface): Promise<any> {
        await this.service.update(id, transaction)
        return { message: 'ok' }
    }

}
