import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany } from "typeorm"
import { Product } from "./Product"

@Entity()
export class ProductOrder extends BaseEntity {

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
        0 = Delivered
        1 = Shipped Out
        2 = Out for Delievery
    */
        
    @ManyToMany((type) => Product, (product) => product.productOrder)
    product?: Product[]

    @Column()
    address?: string
}
