import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany } from "typeorm"
import { ProductOrder } from "./ProductOrder"

@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id?: string

    @Column()
    name?: string

    @Column()
    category?: string

    @Column({ nullable: true })
    description?: string

    @Column({ type: 'float' })
    price?: number

    @Column({ nullable: true })
    variant?: string

    @ManyToMany((type) => ProductOrder, (order) => order.product)
    productOrder?: ProductOrder[]

    // @Column({ type: 'number' })
    // price?: number
    //TODO IMAGES
}
