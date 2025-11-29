import { Request, Response } from "express"
import { pool } from "../server";

export const CreateUser = async (req: Request, res: Response) => {
    try {
        const { name, email, age, phone, address } = req.body;
        const user = await pool.query('INSERT INTO users(name, email,age,phone,address) VALUES($1, $2, $3, $4, $5) RETURNING *', [name, email, age, phone, address]);
        console.log(user);
        res.status(201).json({ success: true, data: user.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error })

    }
}
