import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/entity'
import { Repository } from 'typeorm'
import { UserInterface } from './user.interface'
import * as crypto from 'crypto'

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>
    ) { }

    async save(userDTO: UserInterface): Promise<UserEntity> {
        const user = new UserEntity()
        user.userName = userDTO.userName
        user.email = userDTO.email
        user.password = crypto.createHash('sha256').update(userDTO.password).digest('hex')
        return await this.repository.save(user)
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.repository.find()
    }
}
