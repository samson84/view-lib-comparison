import { Router } from "express";
import { createDb } from "./db.js";

const todoDb = createDb([
  {
    title: 'Do the dishes',
    done: false
  },
  {
    title: 'Read the book',
    done: false
  }
])

const todos = Router()

todos.get('/', (_, res) => res.json(todoDb.readAll()))

todos.get('/:id', (req, res) => {
  const found = todoDb.readById(req.params.id) 
  if(!found) {
    return res.sendStatus(404)
  }
  res.json(found) 
})

todos.post('/', (req, res) =>  { 
  res.send(todoDb.create(req.body)) 
})

todos.patch('/:id', (req, res) => {
  const updated = todoDb.updateById(req.params.id, req.body)
  if (!updated) {
    return res.sendStatus(404)
  }
  res.json(updated)
})

todos.delete('/:id', (req, res) => {
  const removed = todoDb.removeById(req.params.id)
  if (!removed) {
    return res.sendStatus(404)
  }
  res.json(removed)
})

todos.put('/:id', (req, res) => {
  const updated = todoDb.replaceById(req.params.id, req.body)
  if (!updated) {
    return res.sendStatus(404)
  }
  res.json(updated)
})

export default todos