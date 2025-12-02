
import express, { Request, Response } from 'express'
import { Logger } from './middleware/logger'
import { config } from './config'
import { initDB } from './config/db'
import { userRoutes } from './modules/user/user.route'
import { todosRoutes } from './modules/todos/todos.route'
import { authRoutes } from './modules/auth/auth.router'

const app = express()
initDB().then(() => {
    console.log('Database initialized')
}).catch((err) => {
    console.error('Error initializing database:', err.message)
})
app.use(express.json())
app.get('/', Logger, (req: Request, res: Response) => {
    res.send('Hello World!')
});
app.use("/users", userRoutes);
app.use("/todos", todosRoutes);
app.use('/auth', authRoutes);

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})
