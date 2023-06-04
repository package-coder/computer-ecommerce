import { Ref, getModelForClass, prop } from "@typegoose/typegoose"
import { ProductOrder } from "./ProductOrder"
import { ServiceOrder } from "./ServiceOrder"
import mongoose from "mongoose"
import { User } from "./User"

export class Order {
    _id?: string

    @prop({ ref: 'user', required: true })
    user?: Ref<User>

    @prop({ ref: 'Service' })
    serviceOrder?: Ref<ServiceOrder>

    @prop({ ref: 'ProductOrder' })
    productOrder?: Ref<ProductOrder>
        
    @prop({ required: true })
    address?: string
}

export const OrderModel = getModelForClass(Order, { schemaOptions: { timestamps: true } });