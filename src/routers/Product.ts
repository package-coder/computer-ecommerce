import { hash } from "bcrypt";
import express from 'express';
import { Product } from '../entity/Product';
import { dataSource } from '../data-source';
import _ from 'lodash';
const router = express.Router();

router.get('/products', async (req, res) => {
    const repository = dataSource.getRepository(Product)
    const products = await repository.find()
    res.json(products)
})

router.get('/product/:id', async (req, res) => {
    const repository = dataSource.getRepository(Product)
    const product = await repository.findOneByOrFail({ id: req?.params?.id })
    res.json(product)
})

router.post('/add/product', async (req, res) => {
    const repository = dataSource.getRepository(Product)
    let product = req?.body

    product.name = _.startCase(product.name)
    product.category = product.category
    product.variant = product.variant?.toLocaleLowerCase()

    product = repository.create(product)
    product = repository.save(product)
    return res.send(product)
})

router.put('/update/product/:id', async (req, res) => {
    const repository = dataSource.getRepository(Product)
    let product = await repository.findOneByOrFail({ id: req?.params?.id })
    repository.merge(product, req?.body)
    repository.save(product)
    return res.send(product)
})

router.delete('/delete/product/:id', async (req, res) => {
    const repository = dataSource.getRepository(Product)
    let product = await repository.delete(req?.params?.id)
    return res.send(product)
})
 

export default router