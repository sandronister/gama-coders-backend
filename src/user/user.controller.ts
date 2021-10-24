import { Body, Controller, HttpCode, Post } from '@nestjs/common';
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
}
