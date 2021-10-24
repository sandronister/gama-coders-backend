import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity, UserEntity } from 'src/entity';
import { Repository } from 'typeorm';
import sha256 from 'crypto-js/sha256';
import { UserInterface } from './user.interface';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(TransactionEntity)
        private repository: Repository<TransactionEntity>
    ) { }

    async save(userDTO: UserInterface): Promise<UserEntity> {
        const user = new UserEntity()
        user.userName = userDTO.userName
        user.email = userDTO.email
        user.password = sha256(userDTO.password)

        return await this.repository.save(user)
    }
}
