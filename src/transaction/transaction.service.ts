import { Injectable, OnModuleInit } from '@nestjs/common';
import { connectionFactory } from 'src/config/connection';
import { TransactionEntity } from 'src/entity';
import { TransactionInterface } from './transaction.interface';

@Injectable()
export class TransactionService implements OnModuleInit {

    private repository;

    async onModuleInit(): Promise<void> {
        const connection = await connectionFactory.getConnection()
        this.repository = connection.getRepository(TransactionEntity)
    }

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
    async create(transactionDTO: TransactionInterface, userId: number): Promise<void> {
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
    async delete(id: number): Promise<boolean> {
        const transaction = await this.repository.findOne({ id })
        return await this.repository.remove(transaction)
    }

    /**
     * Update Transaction
     * @param id :number
     * @param transactionDTO:TransactionInterface
     * @returns Promise<boolean>
     */
    async update(id: number, transactionDTO: TransactionInterface): Promise<boolean> {
        const transaction = await this.repository.findOnde({ id })

        transaction.quantity = transactionDTO.quantity
        transaction.transaction_date = transactionDTO.transaction_date
        transaction.value_buy = transactionDTO.value_buy

        return await this.repository.save(transaction)
    }

}
