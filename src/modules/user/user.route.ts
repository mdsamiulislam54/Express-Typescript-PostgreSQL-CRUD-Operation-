import express from "express";
import { userController } from "./user.conrtroller";
import auth from "../../middleware/auth";
const router = express.Router();
// all user route
router.post('/', userController.CreateUser);
router.get('/', auth("admin") ,userController.GetUsers);
router.get('/:id', userController.GetUsersById)
router.put('/:id', userController.UpdateUseById);
router.delete('/:id', userController.DeletedUserById);

export const userRoutes = router;