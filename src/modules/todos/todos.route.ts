import express from "express";
import { todosController } from "./todos.controller";
const router = express.Router();

router.post('/', todosController.CreateTodos);
router.delete("/:id", todosController.DeleteTodos)


export const todosRoutes = router;