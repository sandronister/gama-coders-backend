import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from 'src/entity';
import { Repository } from 'typeorm';
import { TransactionInterface } from './transaction.interface';

@Injectable()
export class TransactionService {

    constructor(
        @InjectRepository(TransactionEntity)
        private repository: Repository<TransactionEntity>
    ) { }


    /**
     * List all transaction
     * @returns Promise<TransactionEntity[]>
     */
    async findAll(): Promise<TransactionEntity[]> {
        return await this.repository.find()
    }

    /**
     * List one transaction
     * @param id :number
     * @returns Promise<TransactionEntity> 
     */
    async find(id: number): Promise<TransactionEntity> {
        return await this.repository.findOne({ id })
    }

    /**
     * Create Transaction
     * @param transactionDTO: TransactionInterface
     * @param userId:number
     * @returns Promise<void>
     */
    async create(transactionDTO: TransactionInterface, userId: number): Promise<TransactionEntity> {
        const transaction = new TransactionEntity()

        transaction.quantity = transactionDTO.quantity
        transaction.transaction_date = transactionDTO.transaction_date
        transaction.userId = userId
        transaction.value_buy = transactionDTO.value_buy

        return await this.repository.save(transaction)
    }

    /**
     * Delete Transaction by id
     * @param id:number
     * @returns Promise<boolean>
     */
    async delete(id: number): Promise<TransactionEntity> {
        const transaction = await this.repository.findOne({ id })
        return await this.repository.remove(transaction)
    }

    /**
     * Update Transaction
     * @param id :number
     * @param transactionDTO:TransactionInterface
     * @returns Promise<boolean>
     */
    async update(id: number, transactionDTO: TransactionInterface): Promise<TransactionEntity> {
        const transaction = await this.repository.findOne({ id })

        transaction.quantity = transactionDTO.quantity
        transaction.transaction_date = transactionDTO.transaction_date
        transaction.value_buy = transactionDTO.value_buy

        return await this.repository.save(transaction)
    }

}
