import express from 'express';
import _ from 'lodash';
import { ShopModel, ShopStatus } from '../entity/Shop';
import mongoose from 'mongoose';
import { OrderModel } from '../entity/Order';
import multerStorage from "../multerStorage";
import multer from 'multer';
import { ProductModel } from '../entity/Product';
import { ServiceModel } from '../entity/Service';

const upload = multer({ storage: multerStorage })
const router = express.Router();

router.get('/shop/orders', async (req, res) => {
    let user = res.locals?.payload?.user
    const shop = await ShopModel.findOne({ owner: new mongoose.Types.ObjectId(user?._id) })
    const orders = await OrderModel.find({ shop: new mongoose.Types.ObjectId(shop?._id) })
    
    res.json(orders)
})

router.get('/shop/products', async (req, res) => {
    const user = res.locals?.payload?.user
    const shop = await ShopModel.findOne({
        owner: new mongoose.Types.ObjectId(user?._id) 
    })
    const products = await ProductModel.find({
        shop: new mongoose.Types.ObjectId(shop?._id)
    })
    res.json(products)
})

router.get('/shop/services', async (req, res) => {
    const user = res.locals?.payload?.user
    const shop = await ShopModel.findOne({
        owner: new mongoose.Types.ObjectId(user?._id) 
    })
    const services = await ServiceModel.find({
        shop: new mongoose.Types.ObjectId(shop?._id)
    })
    res.json(services)
})

router.get('/shop', async (req, res) => {
    let user = res.locals?.payload?.user
    const shop = await ShopModel.findOne({
        owner: new mongoose.Types.ObjectId(user?._id) 
    })

    if(!shop) {
        return res.status(404).send('Shop not found')
    }
    
    return res.json(shop)
})

router.post('/add/shop', upload.single('image'), async (req, res) => {
    let shop = req?.body
    let user = res.locals?.payload?.user

    shop.name = _.startCase(shop.name)
    shop.image = req.file

    console.log(req.file)
    shop = await ShopModel.create({
        ...shop,
        owner: user,
        status: ShopStatus.PROCESSING
    })
    return res.send(shop)
})

router.put('/update/shop/:id', async (req, res) => {
    const service = await ShopModel.findByIdAndUpdate(
        req?.params?.id,
        {...req?.body},
        { new: true }
    )
    return res.send(service)
})

export default router