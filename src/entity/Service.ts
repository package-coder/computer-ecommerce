import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { ServiceOrder } from "./ServiceOrder"
import mongoose from 'mongoose';
import { Shop } from './Shop';

export class Service {
    _id?: string

    @prop({ required: true })
    name?: string

    @prop({ required: true })
    category?: string

    @prop()
    description?: string

    @prop({ required: true })
    fee?: number

    @prop({ default: true })
    enable?: boolean

    @prop()
    image?: Express.Multer.File

    @prop({ ref: 'shop' })
    shop?: Ref<Shop>
}

export const ServiceModel = getModelForClass(Service, { schemaOptions: { timestamps: true } });