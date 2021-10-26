import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../entity';
import { UserController } from './user.controller';
import { UserInterface } from './user.interface';
import { UserService } from './user.service';

const newUser: UserInterface = {
  userName: 'valid_username',
  email: 'valid_email@mail.com',
  password: 'valid_password'
}

const usersList: UserInterface[] = [
  new UserEntity({userName: 'user name', email: 'user1@mail.com', password: 'valid_password'}),
  new UserEntity({userName: 'user name', email: 'user2@mail.com', password: 'valid_password'})
]

describe('UserController', () => {
  let userController : UserController
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{
        provide: UserService,
        useValue: {
          findAll: jest.fn().mockResolvedValue(usersList),
          find: jest.fn().mockResolvedValue(usersList[0]),
          save: jest.fn().mockResolvedValue(newUser),
          login: jest.fn().mockResolvedValue({access_token: "valid_token"})
        }
      }]
    }).compile()

    userController = module.get<UserController>(UserController)
    userService = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(userController).toBeDefined()
    expect(userService).toBeDefined()
  })

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const body = newUser

      const result = await userController.create(body)

      expect(result).toEqual({"email": body.email, "userName": body.userName})
      expect(userService.save).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      jest.spyOn(userService, 'save').mockRejectedValueOnce(new Error)

      expect(userController.create(newUser)).rejects.toThrowError()
    })
  })

  describe('list', () => {
    it('should return a list of users', async () => {
      const result = await userController.list()

      expect(result).toEqual(usersList)
    })

    it('should throw an exception', () => {
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error)

      expect(userController.list()).rejects.toThrowError()
    })
  })

  describe('show', () => {
    it('should return a specific user', async () => {
      const result = await userController.show({id: 1})

      expect(result).toEqual(usersList[0])
      expect(userService.find).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', () => {
      jest.spyOn(userService, 'find').mockRejectedValueOnce(new Error)

      expect(userController.show({id: 1})).rejects.toThrowError()
    })
  })

  describe('login', () => {
    it('should return an access token', async () => {
      const body = usersList[0]

      const result = await userController.login(body)

      expect(result).toEqual({access_token: "valid_token"})
    })
  })
})