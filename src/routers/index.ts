


import express from 'express';
import userRouter from './User';
import authRouter from './Auth';
import productRouter from './Product';
import serviceRouter from './Service';
import path from 'path';

const router = express.Router();

const index = '/api/rest/v1/'
router.use(index, userRouter)
router.use(index, authRouter)
router.use(index, productRouter)
router.use(index, serviceRouter)


export default router