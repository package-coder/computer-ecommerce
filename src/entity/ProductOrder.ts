import { prop, getModelForClass, Ref, mongoose } from '@typegoose/typegoose';
import { Product } from "./Product"

export class ProductOrder {
    _id?: string

    @prop({ required: true })
    deliveryDate?: Date

    @prop({ required: true })
    quantity?: number

    @prop({ required: true })
    status?: number

    /*
        -1 = Cancelled
        0 = Delivered
        1 = Shipped Out
        2 = Out for Delievery
    */
        
    @prop({ ref: 'Product', required: true })
    product?: mongoose.Types.Array<Ref<Product>>
}


export const ProductOrderModel = getModelForClass(ProductOrder, { schemaOptions: { timestamps: true } });