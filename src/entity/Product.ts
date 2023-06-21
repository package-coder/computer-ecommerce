import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Shop } from './Shop';
export class Product {
   _id?: string

    @prop({ required: true })
    name?: string

    @prop({ required: true })
    category?: string

    @prop()
    description?: string

    @prop({ required: true })
    price?: number

    @prop()
    variant?: string

    @prop({ default: true })
    enable?: boolean

    @prop()
    image?: Express.Multer.File

    @prop({ ref: 'shop' })
    shop?: Ref<Shop>
}

export const ProductModel = getModelForClass(Product, { schemaOptions: { timestamps: true } });