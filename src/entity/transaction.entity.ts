import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('transaction')
export class TransactionEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ManyToOne(type => UserEntity, user => user.transactions)
    user: UserEntity;

    @Column({ name: 'transaction_date', nullable: false })
    transaction_date: Date;

    @Column({ name: 'quantity', nullable: false })
    quantity: number;

    @Column({ name: 'value_buy', nullable: false })
    value_buy: number;

    @Column({ name: 'crypto_type', nullable: false })
    crypto_type: string;
}