import { pool } from "../../config/db";
import bcrypt from 'bcrypt';

const createUser = async (playload: Record<string, unknown>) => {
    const { name, email,password, age, phone, address } = playload;
    const hashedPassword = await bcrypt.hash(password as string, 10);
    console.log(hashedPassword);
    const user = await pool.query('INSERT INTO users(name, email, password, age,phone,address) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [name, email, hashedPassword, age, phone, address]);

    return user;
}

const getUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result;
}

const GetUsersById = async (id: any) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result;
}

const updateUserById = async (id: any, name: string, email: string) => {
    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
    return result;
}

const deleteUserById = async (id: any) => {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return result;
}

export const userService = {
    createUser,
    getUsers,
    GetUsersById,
    updateUserById,
    deleteUserById
}