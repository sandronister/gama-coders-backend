import { Body, Controller, Get, HttpCode, Param, Post, UseFilters } from '@nestjs/common'
import { UserEntity } from '../entity'
import { AllExceptionsFilter } from '../middleware/AllException.filter'
import { UserInterface } from './user.interface'
import { UserService } from './user.service'

@Controller('user')
export class UserController {

    constructor(private readonly service: UserService) { }

    @Post()
    @HttpCode(201)
    @UseFilters(AllExceptionsFilter)
    async create(@Body() user: UserInterface): Promise<any> {
        const {userName, email} = await this.service.save(user)
        return {userName, email}
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

    @Post('/login')
    @HttpCode(200)
    async login(@Body() user: UserInterface): Promise<any> {
        return await this.service.login(user)
    }


}
