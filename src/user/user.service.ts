import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/entity'
import { Repository } from 'typeorm'
import { UserInterface } from './user.interface'
import * as crypto from 'crypto'
import { validate } from 'class-validator'


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>
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
            throw new Error('e-mail is duplicate')
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
}
