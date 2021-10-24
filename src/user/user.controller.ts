import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from 'src/entity';
import { UserInterface } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly service: UserService) { }

    @Post()
    async create(@Body() user: UserInterface): Promise<UserEntity> {
        return await this.service.save(user)
    }
}
