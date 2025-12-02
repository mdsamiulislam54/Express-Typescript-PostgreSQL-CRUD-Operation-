import { Request, Response } from "express"
import { todosService } from "./todos.service";

const CreateTodos = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;

        const todos = await todosService.CreateTodos(title, description);

        res.status(201).json({ success: true, data: todos.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error })

    }
}
 const DeleteTodos = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await todosService.DeleteTodos(id);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const todosController = {
    CreateTodos,
    DeleteTodos,
    
}