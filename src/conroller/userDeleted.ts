import { Request, Response } from "express";
import { pool } from "../server";

export const DeletedUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE  FROM users WHERE id = $1', [id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}