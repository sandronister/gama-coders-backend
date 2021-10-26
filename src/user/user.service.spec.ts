import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionEntity, UserEntity } from '../entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from './user.interface';

const newUser: UserInterface = {
  userName: 'valid_username',
  email: 'valid_email@mail.com',
  password: 'valid_password'
}

const usersList: UserInterface[] = [
  new UserEntity({userName: 'user name', email: 'user1@mail.com', password: 'valid_password'}),
  new UserEntity({userName: 'user name', email: 'user2@mail.com', password: 'valid_password'})
]

const transactionEntityList: TransactionEntity[] = [
  new TransactionEntity({crypto_type:'BTC', transaction_date: new Date(), quantity: 0.001, value_buy:10 }),
  new TransactionEntity({crypto_type:'BTC', transaction_date: new Date(), quantity: 0.001, value_buy:10 }),
  new TransactionEntity({crypto_type:'BTC', transaction_date: new Date(), quantity: 0.001, value_buy:10 })
]


describe('UserService', () => {
  let userService: UserService
  let userRepository: Repository<UserEntity>
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(usersList),
            findOne: jest.fn().mockResolvedValue(usersList[0]),
            save: jest.fn().mockResolvedValue(usersList[0])
          }
        },
        JwtService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValue('valid_token'),
            createHash: jest.fn().mockResolvedValue('valid_hash')
          }
        }
      ]
    }).compile()

    userService = module.get<UserService>(UserService)
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
    jwtService = module.get<JwtService>(JwtService)
  })

  it('should be defined', () => {
    expect(userService).toBeDefined()
    expect(userRepository).toBeDefined()
    expect(jwtService).toBeDefined()
  })

  describe('existsEmail', () => {
    it('should return true if email exists', async ()=>{
      const body = {
        id: 1,
        transactions: transactionEntityList,
        userName: 'valid_username',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }

      const result = await userService.existsEmail(body)

      expect(result).toEqual(true);
    })

    it('should return false if email not exists', async () => {
      jest.spyOn(userRepository, 'findOne').mockReturnValueOnce(undefined)

      const body = {
        id: 1,
        transactions: transactionEntityList,
        userName: 'valid_username',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }

      const result = await userService.existsEmail(body)

      expect(result).toEqual(false);
    })

    it('should throw an exception', () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error)

      expect(userService.existsEmail).rejects.toThrowError()
    })
  })

  describe('findAll', () => {
    it('should return a list of users', async () => {
    
      const result = await userService.findAll()

      expect(result).toEqual(usersList)
      expect(userRepository.find).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error)

      expect(userService.findAll).rejects.toThrowError()
    })
  })

  describe('find', () => {
    it('should return only one user', async () => {
      const result = await userService.find(1)

      expect(result).toEqual(usersList[0])
      expect(userRepository.findOne).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error)

      expect(userService.find).rejects.toThrowError()
    })
  })
})