import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TransactionInterface } from './transaction.interface';
import { TransactionService } from './transaction.service';

@Controller()
export class TransactionController {

    constructor(private readonly service: TransactionService) { }

    @Get()
    list(): Array<TransactionInterface> {
        return []
    }

    @Get('/:id')
    show(id: number): TransactionInterface {
        return null
    }

    @Post()
    create(transaction: TransactionInterface): void {
        return null
    }

    @Delete('/:id')
    delete(id: number): void {
        return null
    }

    @Put('/:id')
    update(id: number, transaction: TransactionInterface): void {
        return null
    }

}
