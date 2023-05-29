


import express from 'express';
import userRouter from './User';
import authRouter from './Auth';

const router = express.Router();

const index = '/api/rest/v1/'
router.use(index, userRouter)
router.use(index, authRouter)

export default router