import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserEntity } from 'src/entity';
import { UserInterface } from './user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly service: UserService) { }

    @Post()
    @HttpCode(201)
    async create(@Body() user: UserInterface): Promise<any> {
        const res = await this.service.save(user)
        return { message: 'OK' }
    }

    @Get()
    @HttpCode(200)
    async list(): Promise<UserEntity[]> {
        return await this.service.findAll()
    }
}
