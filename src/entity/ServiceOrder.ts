import { prop, getModelForClass, Ref, mongoose } from '@typegoose/typegoose';
import { Service } from "./Service"

export class ServiceOrder {
    _id?: string

    @prop({ required: true })
    status?: number

    /*
        -1 = Cancelled
        0 = Compelted
        1 = Troubleshooting
    */
        
    @prop({ ref: 'Service', required: true })
    service?: mongoose.Types.Array<Ref<Service>>
}

export const ServiceOrderModel = getModelForClass(ServiceOrder, { schemaOptions: { timestamps: true } });