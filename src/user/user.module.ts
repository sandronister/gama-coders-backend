import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constant';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' }
        })
    ],
    controllers: [
        UserController,],
    providers: [
        UserService,],
})
export class UserModule { }
