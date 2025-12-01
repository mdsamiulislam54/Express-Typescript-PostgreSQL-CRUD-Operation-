import { Request, Response } from "express";
import { pool } from "../server";

export const UpdateUseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const result = await pool.query("UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *", [name, email, id]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}