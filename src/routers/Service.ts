import express from 'express';
import { ServiceModel } from '../entity/Service';
import _ from 'lodash';
import multerStorage from "../multerStorage";
import multer from 'multer';
import mongoose from 'mongoose';
import { ShopModel } from '../entity/Shop';

const upload = multer({ storage: multerStorage })
const router = express.Router();

router.get('/services', async (req, res) => {
    const services = await ServiceModel.find({})
    res.json(services)
})

router.get('/service/:id', async (req, res) => {
    const service = await ServiceModel.findById(req?.params?.id)
    res.json(service)
})

router.post('/add/service', upload.single('image'), async (req, res) => {
    let service = req?.body

    service.name = _.startCase(service.name)
    service.category = _.lowerCase(service.category)
    service.image = req.file

    const user = res.locals?.payload?.user
    if(user?.role == 'USER') {
        const shop = await ShopModel.findOne({ owner: new mongoose.Types.ObjectId(user?._id) })
        service.shop = shop
    }

    service = await ServiceModel.create(service)
    return res.send(service)
})

router.put('/update/service/:id', async (req, res) => {
    const service = await ServiceModel.findByIdAndUpdate(
        req?.params?.id,
        {...req?.body},
        { new: true }
    )
    return res.send(service)
})
 

export default router