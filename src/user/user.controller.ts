import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { UserEntity } from 'src/entity'
import { UserInterface } from './user.interface'
import { UserService } from './user.service'

@Controller('user')
export class UserController {

    constructor(private readonly service: UserService) { }

    @Post()
    @HttpCode(201)
    async create(@Body() user: UserInterface): Promise<void> {
        await this.service.save(user)
    }

    @Get()
    @HttpCode(200)
    async list(): Promise<UserEntity[]> {
        return await this.service.findAll()
    }

    @Get('/:id')
    @HttpCode(200)
    async show(@Param() { id }: { id: number }): Promise<UserEntity> {
        return await this.service.find(id)
    }
}
