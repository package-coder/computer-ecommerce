import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    firstName?: string

    @Column()
    lastName?: string

    @Column()
    email?: string

    @Column()
    password?: string

    @Column({ default: true })
    enable?: boolean

    @Column({ nullable: true })
    role?: string    //ADMIN, CUSTOMER
}
