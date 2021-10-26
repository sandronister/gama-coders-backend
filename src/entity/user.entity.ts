import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TransactionEntity } from "./transaction.entity";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number

    @Column({ name: 'name', nullable: false })
    @IsNotEmpty({ message: 'userName is required' })
    userName: string

    @Column({ name: 'email', unique: true, nullable: false })
    @IsNotEmpty({ message: 'email is required' })
    email: string

    @Column({ name: 'password', nullable: false })
    @IsNotEmpty({ message: 'password is required' })
    password: string

    @OneToMany(type => TransactionEntity, transactions => transactions.user)
    transactions: TransactionEntity[]

    constructor(user?: Partial<UserEntity>) {
        this.email = user?.email;
        this.userName = user?.userName;
        this.password = user?.password;
    }
}