import { hash } from "bcrypt";
import express from 'express';
import { UserModel } from '../entity/User';
import _ from 'lodash';
import multer from 'multer'
import multerStorage from "../multerStorage";


const upload = multer({ storage: multerStorage })
const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await UserModel.find({})
    res.json(users)
})

router.get('/user/:id', async (req, res) => {
    const user = await UserModel.findById(req?.params?.id)
    res.json(user)
})

router.post('/add/user', async (req, res) => {
    let user = req?.body
    user.firstName = _.startCase(user.firstName)
    user.lastName = _.startCase(user.lastName)
    user.password = await hash(user.password, 12)

    user = await UserModel.create(user)
    return res.send(user)
})

router.put('/update/user/:id', async (req, res) => {
    const user = await UserModel.findByIdAndUpdate(
        req?.params?.id,
        {...req?.body},
        { new: true }
    )
    return res.send(user)
})

export default router