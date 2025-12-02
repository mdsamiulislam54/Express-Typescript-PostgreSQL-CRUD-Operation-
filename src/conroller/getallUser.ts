import { Request, Response } from "express";
import { pool } from "../config/db";

export const GetUsers = async (req:Request, res:Response)=>{
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }
}