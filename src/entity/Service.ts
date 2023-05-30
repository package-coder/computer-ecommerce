import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany } from "typeorm"
import { ServiceOrder } from "./ServiceOrder"

@Entity()
export class Service extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    name?: string

    @Column()
    category?: string

    @Column({ nullable: true })
    description?: string

    @Column({ type: 'float' })
    fee?: number

    @ManyToMany((type) => ServiceOrder, (order) => order.service)
    serviceOrder?: ServiceOrder[]
}
