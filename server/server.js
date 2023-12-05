import express, { json, Router } from 'express';
import todos from './todos.router.js'
import morgan from 'morgan';

const PORT = 4400

const api = Router()
api.use('/todos', todos)

const app = express();
app.use(json())
app.use(morgan('dev'))
app.use('/api', api)

app.listen(PORT, () => { console.log(`listening on ${PORT}`); })