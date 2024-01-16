import type { Todo } from './todo.type'

export type CreateTodo = Omit<Todo, 'id'>
