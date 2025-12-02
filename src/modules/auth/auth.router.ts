import express, { Request, Response } from "express";
import { authController } from "./auth.controller";
const router = express.Router();

router.post('/login', authController.LoginUser)

export const authRoutes = router;