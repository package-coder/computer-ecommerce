import express from 'express';
import _, { omit } from 'lodash';
import { OrderModel, OrderStatus } from '../entity/Order';
import { ProductOrderModel } from '../entity/ProductOrder';
import { ServiceOrderModel } from '../entity/ServiceOrder';
import mongoose from 'mongoose';
import { ShopModel } from '../entity/Shop';
import { ProductModel } from '../entity/Product';
import { ServiceModel } from '../entity/Service';
import { UserModel } from '../entity/User';
const router = express.Router();

router.get('/orders4user', async (req, res) => {
    let user = res.locals?.payload?.user
    // const matched = user.role == 'USER' ? [{
    //     $match: {
    //         user: new mongoose.Types.ObjectId(user?._id)
    //     }
    // }] : []

    const orders = await OrderModel.aggregate([
        {
            $match: {
                user: new mongoose.Types.ObjectId(user?._id)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $addFields: {
                user: { $arrayElemAt: ['$user', 0] }
            }
        }
    ]).sort({ _id: -1 })

    res.json(orders)
})

router.get('/orders4provider', async (req, res) => {
    let user = res.locals?.payload?.user
    // const matched = user.role == 'USER' ? [{
    //     $match: {
    //         user: new mongoose.Types.ObjectId(user?._id)
    //     }
    // }] : []
    const shop = await ShopModel.findOne({owner:user?._id})
    const products = await ProductModel.find({shop:shop?._id})
    const services = await ServiceModel.find({shop:shop?._id})
    let productandservice: any[] = []
    for (let index = 0; index < products.length; index++) {
        productandservice.push(...await ProductOrderModel.find({product:products[index]?._id}))
    }
    for (let index = 0; index < services.length; index++) {
        productandservice.push(...await ProductOrderModel.find({product:services[index]?._id}))
    }
    let orders: any[] = []
    for (let index = 0; index < productandservice.length; index++) {
        orders.push(await OrderModel.findById(productandservice[index]?.orderDetails))
    }
    let result: any[] = []
    for (let index = 0; index < orders.length; index++) {
        if(orders[index].status == 2){
            result.push({...orders[index]._doc, user: await UserModel.findById(orders[index]?.user)})
        }
    }
    const uniqueOrder = result.reduce((accumulator, current) => {
        if (!accumulator.some((item: { orderId: any; }) => item.orderId === current.orderId)) {
          accumulator.push(current);
        }
        return accumulator;
    }, []);
    console.log(uniqueOrder)
    res.json(uniqueOrder)
})

router.get('/order/:id', async (req, res) => {
    const order = await OrderModel.findById(req?.params?.id)
    res.json(order)
})

router.post('/add/order', async (req, res) => {
    let order = req?.body
    let user = res.locals?.payload?.user
    order.orderId = Date.now()?.toString()
    order = await OrderModel.create({
        ...omit(order, ['productOrder', 'serviceOrder']),
        user,
        status: OrderStatus.PROCESSING
    })

    console.log(order)

    let productOrder = req?.body?.productOrder
    let serviceOrder = req?.body?.serviceOrder

    await ProductOrderModel.insertMany(
        productOrder?.map((item: any) => ({
            ...item,
            orderDetails: order,
        })) || []
    )
    
    await ServiceOrderModel.insertMany(
        serviceOrder?.map((item: any) => ({
            ...item,
            orderDetails: order,
        })) || []
    )

    return res.send(order)
})

router.put('/update/order/:id', async (req, res) => {
    console.log(req?.params?.id)
    try {
        const order = await OrderModel.findOneAndUpdate(
            {orderId:req?.params?.id},
            {...req?.body},
            { new: true }
        )
    } catch (error) {
        return res.send(false)
    }
    return res.send(true)
    // return res.send(order)
})


export default router