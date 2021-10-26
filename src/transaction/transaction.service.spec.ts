import { Test, TestingModule } from '@nestjs/testing';
import { TransactionEntity } from '../entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { Repository } from 'typeorm';

const newTransaction = {
  quantity: 0.01,
  transaction_date: new Date(),
  userId: 1,
  value_buy: 200
}

const transactionEntityList: TransactionEntity[] = [
  new TransactionEntity({crypto_type:'BTC', transaction_date: new Date(), quantity: 0.001, value_buy:10 }),
  new TransactionEntity({crypto_type:'BTC', transaction_date: new Date(), quantity: 0.001, value_buy:10 }),
  new TransactionEntity({crypto_type:'BTC', transaction_date: new Date(), quantity: 0.001, value_buy:10 })
]

describe('TransactionService', () => {
  let transactionService : TransactionService
  let transactionRepository: Repository<TransactionEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getRepositoryToken(TransactionEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(transactionEntityList),
            findOne: jest.fn().mockResolvedValue(transactionEntityList[0]),
            save: jest.fn().mockResolvedValue(transactionEntityList[0]),
            update: jest.fn().mockResolvedValue(transactionEntityList[0]),
            remove: jest.fn().mockReturnValue(undefined)
          }
        }
      ]
    }).compile()

    transactionService = module.get<TransactionService>(TransactionService)
    transactionRepository = module.get<Repository<TransactionEntity>>(getRepositoryToken(TransactionEntity))
  })

  it('should be defined', () => {
    expect(transactionService).toBeDefined()
    expect(transactionRepository).toBeDefined()
  });

  describe('findAll', () => {
    it('should return a list of transaction', async () => {
      const result = await transactionService.findAll();

      expect(result).toEqual(transactionEntityList)
    })

    it('should throw an exception', async () => {
      jest.spyOn(transactionRepository, 'find').mockRejectedValueOnce(new Error)

      expect(transactionService.findAll).rejects.toThrowError()
    })
  })

  describe('findOne', () => {
    it('should return just one transaction', async () =>{
      const result = await transactionService.find(1)

      expect(result).toEqual(transactionEntityList[0])
    })

    it('should throw an expection', async () => {
      jest.spyOn(transactionRepository, 'findOne').mockRejectedValueOnce(new Error)

      expect(transactionService.find(1)).rejects.toThrowError()
    })
  })

  describe('create', () => {
    it('should create a transaction', async () => {
      const body = transactionEntityList[0];

      const result = await transactionService.create(body, 1)

      expect(result).toEqual(body)
      expect(transactionRepository.save).toHaveBeenCalledTimes(1)
    })

    it('should throw an expection', async () => {
      jest.spyOn(transactionRepository, 'save').mockRejectedValueOnce(new Error)

      expect(transactionService.create(newTransaction, 1)).rejects.toThrowError()
    })
  })

  describe('update', () => {
    it('should update a transaction', async () => {
      const body = transactionEntityList[0];

      const result = await transactionService.update(1, body)

      expect(result).toEqual(body)
      expect(transactionRepository.findOne).toHaveBeenCalledTimes(1)
      expect(transactionRepository.save).toHaveBeenCalledTimes(1)
    })
    
    it('should throw an expection if not found', async () => {
      jest.spyOn(transactionRepository, 'findOne').mockRejectedValueOnce(new Error)

      expect(transactionService.update(1, newTransaction)).rejects.toThrowError()
    })

    it('should throw an expection if dont save', async () => {
      jest.spyOn(transactionRepository, 'save').mockRejectedValueOnce(new Error)

      expect(transactionService.update(1, newTransaction)).rejects.toThrowError()
    })
  })

  describe('delete', () => {
    it('should delete a transaction succesfully', async () => {
      const result = await transactionService.delete(1)

      expect(result).toEqual(undefined)
      expect(transactionRepository.findOne).toHaveBeenCalledTimes(1)
      expect(transactionRepository.remove).toHaveBeenCalledTimes(1)
    })

    it('should throw an expection if not found', async () => {
      jest.spyOn(transactionRepository, 'findOne').mockRejectedValueOnce(new Error)

      expect(transactionService.delete(1)).rejects.toThrowError()
    })

    it('should throw an expection if dont remove', async () => {
      jest.spyOn(transactionRepository, 'remove').mockRejectedValueOnce(new Error)

      expect(transactionService.delete(1)).rejects.toThrowError()
    })
  })
})