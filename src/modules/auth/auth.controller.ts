import { authServices } from "./auth.service";
import { Request, Response } from "express"

const LoginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await authServices.LoginUser(email, password);
        res.status(200).json({ success: true, message: 'login Successfully', user })
    } catch (error) {
        res.status(500).json({ success: false, message: 'User login  Error', error: error })
    }
}


export const authController = {
    LoginUser
}