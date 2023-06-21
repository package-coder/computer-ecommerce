import { Ref, getModelForClass, prop } from "@typegoose/typegoose"
import { User } from "./User"

export enum ShopStatus {
    REJECTED,
    APPROVED,
    PROCESSING
}

export class Shop {
    _id?: string

    @prop()
    image?: Express.Multer.File
    
    @prop({ required: true })
    name?: string

    @prop({ ref: 'user', required: true })
    owner?: Ref<User>

    @prop({ enum: ShopStatus, required: true })
    status?: ShopStatus
}

export const ShopModel = getModelForClass(Shop, { schemaOptions: { timestamps: true } });