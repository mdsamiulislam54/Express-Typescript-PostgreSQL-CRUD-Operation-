
import express, { Request, Response } from 'express'
import { CreateUser } from './conroller/createUser'
import { CreateTodos } from './conroller/createTodos'
import { GetUsers } from './conroller/getallUser'
import { GetUsersById } from './conroller/getUserById'
import { UpdateUseById } from './conroller/updateUserByid'
import { DeletedUser } from './conroller/userDeleted'
import { DeleteTodos } from './conroller/todosDeleted'
import { NotFound } from './conroller/notfound'
import { Logger } from './middleware/logger'
import { config } from './config'
import { initDB } from './config/db'

const app = express()
app.use(express.json())



initDB().then(() => {
    console.log('Database initialized')
}).catch((err) => {
    console.error('Error initializing database:', err.message)
})



app.get('/', Logger, (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.post('/users', CreateUser);
app.post('/todos', CreateTodos);
app.get("/users", GetUsers);
app.get('/users/:id', GetUsersById)
app.put('/users/:id', UpdateUseById);
app.delete('/users/:id', DeletedUser);
app.delete("/todos/:id", DeleteTodos)

app.use(NotFound)
app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})
