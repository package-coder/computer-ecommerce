import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany } from "typeorm"
import { Product } from "./Product"
import { Service } from "./Service"

@Entity()
export class ServiceOrder extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column({ type: 'date' })
    deliveryDate?: string

    @Column({ type: 'date' })
    orderDate?: string

    @Column({ type: 'int' })
    quantity?: number

    @Column({ type: 'int' })
    status?: number

    /*
        -1 = Cancelled
        0 = Compelted
        1 = Troubleshooting
    */
        
    @ManyToMany((type) => Service, (service) => service.serviceOrder)
    service?: Service[]

    @Column()
    address?: string
}
