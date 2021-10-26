import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../entity'
import { Repository } from 'typeorm'
import { UserInterface } from './user.interface'
import * as crypto from 'crypto'
import { validate } from 'class-validator'
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>,
        private jwtService: JwtService
    ) { }

    async existsEmail(user: UserEntity): Promise<boolean> {
        const validateEmail = await this.repository.findOne({ "email": user.email })
        return validateEmail != undefined
    }

    async validate(user: UserEntity): Promise<any> {
        const errors = await validate(user)

        if (errors.length > 0) {
            const message = Object.values(errors[0].constraints)
            throw new Error(message[0])
        }

        const validMail = await this.existsEmail(user)
        if (validMail) {
            throw new Error('Is email duplicate')
        }
    }

    async save(userDTO: UserInterface): Promise<UserEntity> {
        const user = new UserEntity()
        user.userName = userDTO.userName
        user.email = userDTO.email
        user.password = crypto.createHash('sha256').update(userDTO.password).digest('hex')

        await this.validate(user)

        return await this.repository.save(user)
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.repository.find()
    }

    async find(id: number): Promise<UserEntity> {
        return await this.repository.findOne({ id })
    }

    async login(userDTO: UserInterface): Promise<any> {
        userDTO.password = crypto.createHash('sha256').update(userDTO.password).digest('hex')
        const user = await this.repository.findOne({ "email": userDTO.email, password: userDTO.password })

        if (user == undefined) {
            throw new Error('Invalid Login')
        }

        return {
            access_token: this.jwtService.sign({ userName: user.userName, userId: user.id })
        }
    }
}
