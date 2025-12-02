import express from "express";
import { userController } from "./user.conrtroller";

const router = express.Router();

router.post('/', userController.CreateUser);
router.get('/', userController.GetUsers);
router.get('/:id', userController.GetUsersById)
router.put('/:id', userController.UpdateUseById);
router.delete('/:id', userController.DeletedUserById);

export const userRoutes = router;