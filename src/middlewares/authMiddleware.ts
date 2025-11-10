// src/middlewares/adminAuth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApiError } from "../utils/errors/ApiError";
import User from "../models/User";
dotenv.config();

export interface AuthRequest extends Request {
  user?: any;
}
function validateToken(token: string) {
  try {
    const bearer = token.split(" ");
    const [, bearerToken] = bearer;

    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET!) as any;
    console.log("🚀 ~ validateToken ~ decoded:", decoded)

    if (!decoded.id) {
      return {
        token: false,
        message: "token_malformed",
      };
    }
    return {
      token: true,
      decoded,
    };
  } catch (error) {
    return {
      token: false,
      message: error instanceof Error ? error.message : "invalid_token",
    };
  }
}

export const tokenAuthorization = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      throw new ApiError(
        "authorization_header_missing",
        400,
        ("authorization_header_missing")
      );

    const getToken = validateToken(authorization);
    console.log("🚀 ~ tokenAuthorization ~ getToken:", getToken)
    if (!getToken.token)
      throw new ApiError(
        " Invalid token",
        401,
        getToken.message,
        ("invalid_token"),
        true
      );

    const user = await User.findById(getToken.decoded.id);
    if (!user) {
      throw new ApiError(
        " User not found",
        401,
        getToken.message,
        ("user_not_found"),
        true
      );
    }
    // if (getToken.decoded.tokenVersion !== user.tokenVersion) {
    //   throw new ApiError(
    //     "Session Expire",
    //     401,
    //     ("session_expire"),
    //     "Session is Expired",
    //     true
    //   );
    // }

    req.user = getToken.decoded.id;
    console.log("🚀 ~ tokenAuthorization ~ user:", req.user)

    next();
  } catch (error) {
    next(error);
  }
};
