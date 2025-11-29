import { Request, Response } from "express"
import { pool } from "../server";

export const CreateTodos = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        console.log(title, description);
        const todos = await pool.query('INSERT INTO todos(title , description) VALUES($1, $2) RETURNING *', [title, description]);

        res.status(201).json({ success: true, data: todos.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error })

    }
}
