import { pool } from "../../config/db";


const CreateTodos = async (title:string, description:string) => {
    const result = await pool.query('INSERT INTO todos(title , description) VALUES($1, $2) RETURNING *', [ title, description]);

    return result;
}

const DeleteTodos = async (id:any) => {
    const result = await pool.query('DELETE  FROM todos WHERE id = $1', [id]);
    return result;
}


export const todosService = {
    CreateTodos,
    DeleteTodos
}