import express from 'express';
import { Service } from '../entity/Service';
import { dataSource } from '../data-source';
import _ from 'lodash';
import { ServiceOrder } from '../entity/ServiceOrder';
import { ProductOrder } from '../entity/ProductOrder';
import { OrderModel } from '../entity/Order';
const router = express.Router();

router.get('/orders', async (req, res) => {
    const orders = await OrderModel.find({})
    res.json(orders)
})

router.get('/order/:id', async (req, res) => {
    const order = await OrderModel.findById(req?.params?.id)
    res.json(order)
})

router.post('/add/order', async (req, res) => {
    let order = req?.body

    order = await OrderModel.create(order)
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