import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from "../config";
const auth = (...role: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(404).send({ message: "Your are not allow(unauthorize)" })
            }
            const decode = jwt.verify(token, config.jwt_secret) as JwtPayload

            if (role.length && !role.includes(decode.role as string)) {
                res.status(500).json({
                    success: false,
                    error: "Unauthorized"
                })
            }
            if (decode) {
                req.user = decode as JwtPayload
                next()
            }
        } catch (error) {
            res.status(500).json({ success: false, error })
        }

    }
}

export default auth