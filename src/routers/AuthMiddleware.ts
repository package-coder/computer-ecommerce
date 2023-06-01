import { User } from "../entity/User";
import { dataSource } from "../data-source";
import {
  generateRefreshToken,
  generateAccessToken,
} from "../services/authentication";
import { verify } from "jsonwebtoken";
import { auth_config } from "../../config/env";
import { Request, Response, NextFunction } from "express";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repository = dataSource.getRepository(User);

  const token = req?.cookies?.jwt;
  if (!token) return res.status(401).send("Unathorized");

  let payload: any = null;
  try {
    payload = verify(token, auth_config.REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.error(err);
    return res.status(401).send("Session Expired");
  }

  const user = await repository.findOneByOrFail({ email: payload?.email });
  const refreshToken = generateRefreshToken({ user }, { expiresIn: "7d" });
  const accessToken = generateAccessToken({ user }, { expiresIn: "15m" });

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    path: "/refresh_token",
  });
  res.status(200).json({ token: accessToken });

  res.locals.user = user;

  next();
};

export default authMiddleware;
