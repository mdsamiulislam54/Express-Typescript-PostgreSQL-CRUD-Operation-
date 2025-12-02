import { pool } from "../../config/db";

const createUser = async (name: string, email: string, age: number, phone: string, address: string) => {
    const user = await pool.query('INSERT INTO users(name, email,age,phone,address) VALUES($1, $2, $3, $4, $5) RETURNING *', [name, email, age, phone, address]);

    return user;
}

const getUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result;
}

const GetUsersById = async (id:any) => {
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