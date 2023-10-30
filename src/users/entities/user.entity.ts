import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('User')
export class User {
    @PrimaryColumn()
    id: string;

    @Column({length: 30})
    name: string;

    @Column({length: 60})
    email: string;

    @Column({length: 30})
    password: string;

    @Column({ length: 60 })
    authCode: string;
}
