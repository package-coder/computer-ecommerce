import express from 'express';
import { Service } from '../entity/Service';
import { dataSource } from '../data-source';
import _ from 'lodash';
import { ServiceOrder } from '../entity/ServiceOrder';
import { ProductOrder } from '../entity/ProductOrder';
const router = express.Router();

router.get('/orders/services', async (req, res) => {
    const repository = dataSource.getRepository(ServiceOrder)
    const orders = await repository.find()
    res.json(orders)
})

router.get('/orders/products', async (req, res) => {
    const repository = dataSource.getRepository(ProductOrder)
    const orders = await repository.find()
    res.json(orders)
})

router.get('/order/services/:id', async (req, res) => {
    const repository = dataSource.getRepository(ServiceOrder)
    const order = await repository.findOneByOrFail({ id: req?.params?.id })
    res.json(order)
})

router.get('/order/services/:id', async (req, res) => {
    const repository = dataSource.getRepository(ProductOrder)
    const order = await repository.findOneByOrFail({ id: req?.params?.id })
    res.json(order)
})

router.post('/add/order/services', async (req, res) => {
    const repository = dataSource.getRepository(ServiceOrder)
    let order = req?.body

    order = repository.create(order)
    order = repository.save(order)
    return res.send(order)
})

router.post('/add/order/products', async (req, res) => {
    const repository = dataSource.getRepository(ProductOrder)
    let order = req?.body

    order = repository.create(order)
    order = repository.save(order)
    return res.send(order)
}) 

router.put('/update/order/services/:id', async (req, res) => {
    const repository = dataSource.getRepository(ServiceOrder)
    let service = await repository.findOneByOrFail({ id: req?.params?.id })
    repository.merge(service, req?.body)
    repository.save(service)
    return res.send(service)
})

router.delete('/delete/order/products/:id', async (req, res) => {
    const repository = dataSource.getRepository(ProductOrder)
    let service = await repository.delete(req?.params?.id)
    return res.send(service)
})
 

export default router