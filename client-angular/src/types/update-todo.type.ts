import type  { Todo } from './todo.type'

export type UpdateTodo = Omit<Partial<Todo>, 'id'>