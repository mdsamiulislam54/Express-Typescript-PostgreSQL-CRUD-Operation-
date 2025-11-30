import dotenv from 'dotenv'
import path from 'path'
import express, { Request, Response } from 'express'
dotenv.config({ path: path.join(process.cwd(), '.env') })
import pg from 'pg'
import { CreateUser } from './conroller/createUser'
import { CreateTodos } from './conroller/createTodos'
import { GetUsers } from './conroller/getallUser'
import { GetUsersById } from './conroller/getUserById'

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000;

export const pool = new pg.Pool({
    connectionString: process.env.DB
})

export const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            age INT NOT NULL,
            phone VARCHAR(15),
            address TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        )
        `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS todos(
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                completed BOOLEAN DEFAULT FALSE,
                due_date DATE ,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)
}

initDB().then(() => {
    console.log('Database initialized')
}).catch((err) => {
    console.error('Error initializing database:', err.message)
})




app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.post('/users', CreateUser);
app.post('/todos', CreateTodos);
app.get("/user", GetUsers);
app.get('/users/:id', GetUsersById)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
