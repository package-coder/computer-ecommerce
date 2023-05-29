
import { compare } from "bcrypt";
import express from 'express';
import { User } from '../entity/User';
import { dataSource } from '../data-source';
import { generateRefreshToken, generateAccessToken } from "../services/authentication";
import { verify } from "jsonwebtoken";
import { auth_config } from "../../config/env";
const router = express.Router();


router.post('/auth/login', async (req, res) => {
    const repository = dataSource.getRepository(User)

    const body = req?.body
    const user = await repository.findOneByOrFail({ email: body?.email });
    if (!await compare(body?.password, user?.password as string)) {
        res.status(400).send('Invalid password')
        return
    }

    const refreshToken = generateRefreshToken({ user }, { expiresIn: '7d' })
    const accessToken = generateAccessToken({ user }, { expiresIn: '15m' })

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        path: '/refresh_token'
    })
    res.status(200).json({ token: accessToken })
})

router.post('/auth/refresh-token', async (req, res) => {
    const repository = dataSource.getRepository(User)

    const token = req?.cookies?.jwt;
    if(!token) return res.status(401).send('Unathorized')

    let payload: any = null;
    try {
        payload = verify(token, auth_config.REFRESH_TOKEN_SECRET);
    } catch (err) {
        console.error(err);
        return res.status(401).send('Session Expired')
    }

    const user = await repository.findOneByOrFail({ email: payload?.email });
    const refreshToken = generateRefreshToken({ user }, { expiresIn: '7d' })
    const accessToken = generateAccessToken({ user }, { expiresIn: '15m' })

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        path: '/refresh_token'
    })
    res.status(200).json({ token: accessToken })
})

router.post('/auth/logout', async (req, res) => {
    req.headers['authorization'] = undefined
    res.clearCookie("jwt");
    return
})


export default router