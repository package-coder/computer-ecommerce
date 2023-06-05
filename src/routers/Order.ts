import express from 'express';
import _, { omit } from 'lodash';
import { OrderModel, OrderStatus } from '../entity/Order';
import { ProductOrderModel } from '../entity/ProductOrder';
import { ServiceOrderModel } from '../entity/ServiceOrder';
const router = express.Router();

router.get('/orders', async (req, res) => {
    // console.log(req.params)
    // console.log(req.query?.status)
    // const status = req.query?.status as string
    // const orderStatus = OrderStatus[status as keyof typeof OrderStatus]
    
    // let query: any = undefined
    // if(status) 
    //     query = { status:  }

    // console.log(query)
    const orders = await OrderModel.find({})
    res.json(orders)
})

router.get('/order/:id', async (req, res) => {
    const order = await OrderModel.findById(req?.params?.id)
    res.json(order)
})

router.post('/add/order', async (req, res) => {
    let order = req?.body

    console.log(order)

    order.orderId = Date.now()?.toString()
    order = await OrderModel.create({
        ...omit(order, ['productOrder', 'serviceOrder']),
        status: OrderStatus.PROCESSING
    })
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
    const order = await OrderModel.findByIdAndUpdate(
        req?.params?.id,
        {...req?.body},
        { new: true }
    )
    return res.send(order)
})


export default router