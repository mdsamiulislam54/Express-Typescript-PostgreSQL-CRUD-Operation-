
import express, { Request, Response } from 'express'
import { Logger } from './middleware/logger'
import { config } from './config'
import { initDB } from './config/db'
import { userRoutes } from './modules/user/user.route'
import { todosRoutes } from './modules/todos/todos.route'

const app = express()
app.use(express.json())



initDB().then(() => {
    console.log('Database initialized')
}).catch((err) => {
    console.error('Error initializing database:', err.message)
})



app.get('/', Logger, (req: Request, res: Response) => {
    res.send('Hello World!')
});

app.use("/users", userRoutes)
app.use("/todos", todosRoutes)
// app.use('*', (req: Request, res: Response) => {
//     res.status(404).json({ message: 'Route not found' });
// });
app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})
