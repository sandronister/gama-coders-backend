import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TransactionEntity } from "./transaction.entity";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number

    @Column({ name: 'name', nullable: false })
    userName: string

    @Column({ name: 'email', unique: true, nullable: false })
    email: string

    @Column({ name: 'password', nullable: false })
    password: string

    @OneToMany(type => TransactionEntity, transactions => transactions.user)
    transactions: TransactionEntity[]
}