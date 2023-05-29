import { hash } from "bcrypt";
import express from 'express';
import { User } from '../entity/User';
import { dataSource } from '../data-source';
import _ from 'lodash';
const router = express.Router();

router.get('/users', async (req, res) => {
    const repository = dataSource.getRepository(User)
    const users = await repository.find()
    res.json(users)
})

router.get('/user/:id', async (req, res) => {
    const repository = dataSource.getRepository(User)
    const user = await repository.findOneByOrFail({ id: req?.params?.id })
    res.json(user)
})

router.post('/add/user', async (req, res) => {
    const repository = dataSource.getRepository(User)
    let user = req?.body

    user.firstName = _.startCase(user.firstName)
    user.lastName = _.startCase(user.lastName)
    user.password = await hash(user.password, 12)

    user = repository.create(user)
    user = repository.save(user)
    return res.send(user)
})

router.put('/update/user/:id', async (req, res) => {
    const repository = dataSource.getRepository(User)
    let user = await repository.findOneByOrFail({ id: req?.params?.id })
    repository.merge(user, req?.body)
    repository.save(user)
    return res.send(user)
})

router.delete('/enable/user/:id', async (req, res) => {
    const repository = dataSource.getRepository(User)
    let user = await repository.findOneByOrFail({ id: req?.params?.id })
    repository.merge(user, req?.body)
    repository.save(user)
    return res.send(user)
})


export default router