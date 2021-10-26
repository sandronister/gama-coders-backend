import { toUnicode } from "punycode";
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

    @Column({ name: 'user_id', nullable: false })
    userId: number;

    @Column({ name: 'quantity', nullable: false })
    quantity: number;

    @Column({ name: 'value_buy', nullable: false })
    value_buy: number;

    @Column({ name: 'crypto_type', nullable: false })
    crypto_type: string;

    constructor(transaction?: Partial<TransactionEntity>) {
        this.crypto_type = transaction?.crypto_type;
        this.transaction_date = transaction?.transaction_date;
        this.userId = transaction?.userId;
        this.value_buy = transaction?.value_buy;
        this.quantity = transaction?.quantity;
    }
}