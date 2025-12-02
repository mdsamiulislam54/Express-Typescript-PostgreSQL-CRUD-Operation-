import { Request, Response } from "express"
import { pool } from "../config/db";


export const CreateTodos = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        
        const todos = await pool.query('INSERT INTO todos(user_id ,title , description) VALUES($1, $2, $3) RETURNING *', [16, title, description]);

        res.status(201).json({ success: true, data: todos.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error })

    }
}
