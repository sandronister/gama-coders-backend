import { Test, TestingModule } from '@nestjs/testing';
import { TransactionEntity } from '../entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

const transactionEntity: TransactionEntity = new TransactionEntity({crypto_type:'BTC', transaction_date: new Date(), quantity: 0.001, value_buy:10 })

const transactionEntityList: TransactionEntity[] = [
  new TransactionEntity({crypto_type:'BTC', transaction_date: new Date(), quantity: 0.001, value_buy:10 }),
  new TransactionEntity({crypto_type:'BTC', transaction_date: new Date(), quantity: 0.001, value_buy:10 }),
  new TransactionEntity({crypto_type:'BTC', transaction_date: new Date(), quantity: 0.001, value_buy:10 })
]

const newTransaction = {
  quantity: 0.01,
  transaction_date: new Date(),
  userId: 1,
  value_buy: 200
}

describe('TransactionController', () => {
  let transactionController: TransactionController
  let transactionService: TransactionService
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [{
        provide: TransactionService,
        useValue: {
          findAll: jest.fn().mockResolvedValue(transactionEntityList), 
          find: jest.fn().mockResolvedValue(transactionEntity), 
          create: jest.fn().mockResolvedValue(newTransaction), 
          delete: jest.fn().mockResolvedValue({"message": "ok"}), 
          update: jest.fn().mockResolvedValue({"message": "ok"})
        }
      }]
    }).compile()

    transactionController = module.get<TransactionController>(TransactionController)
    transactionService = module.get<TransactionService>(TransactionService)
  })

  it('should be defined', () => {
    expect(transactionController).toBeDefined()
    expect(transactionService).toBeDefined()
  })

  describe('findAll', () => {
    it('should return a list of transactions', async () =>{
      const result = await transactionController.list()

      expect(result).toEqual(transactionEntityList)
      expect(transactionService.findAll).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      jest.spyOn(transactionService, 'findAll').mockRejectedValueOnce(new Error())
    
      expect(transactionController.list()).rejects.toThrowError()
    })
  })

  describe('show', () => {
    it('should return just one transaction', async () => {
      const result = await transactionController.show(1)

      expect(result).toEqual(transactionEntity)
    })

    it('should throw an exception', () => {
      jest.spyOn(transactionService, 'find').mockRejectedValueOnce(new Error())
    
      expect(transactionController.show(1)).rejects.toThrowError()
    })
  })

  describe('create', () => {
    it('should create a transaction successfully', async () => {
      const body = newTransaction;

      const result = await transactionController.create(body)

      expect(result).toEqual(body)
      expect(transactionService.create).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      const body = newTransaction;

      jest.spyOn(transactionService, 'create').mockRejectedValueOnce(new Error)

      expect(transactionController.create(body)).rejects.toThrowError()
    })
  })

  describe('delete', () => {
    it('should delete a transaction succesfully', async () => {
      const result = await transactionService.delete(5)

      expect(result).toEqual({"message": "ok"})
    })

    it('should throw an exception', () => {
      jest.spyOn(transactionService, 'delete').mockRejectedValueOnce(new Error)

      expect(transactionController.delete(5)).rejects.toThrowError()
    })
  })

  describe('update', () => {
    it('should update a transaction', async () => {
      const body = {
        quantity: 0.01,
        transaction_date: new Date(),
        value_buy: 200
      }

      const result = await transactionService.update(3, body)

      expect(result).toEqual({"message": "ok"})
    })

    it('should throw an exception', () => {
      const body = {
        quantity: 0.01,
        transaction_date: new Date(),
        value_buy: 200
      }
      
      jest.spyOn(transactionService, 'delete').mockRejectedValueOnce(new Error)

      expect(transactionController.update(3, body)).rejects.toThrowError()
    })
  })
})
