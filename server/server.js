import express, { json, Router } from 'express';
import todos from './todos.router.js'

const PORT = 4400

const app = express();
app.use(json())
const api = Router()
app.use('/api', api)
api.use('/todos', todos)

app.listen(PORT, () => { console.log(`listening on ${PORT}`); })