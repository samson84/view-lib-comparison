export type Todo = {
  id: string
  title: string
  done: boolean
}

export type CreateTodo = Omit<Todo, 'id'>
export type UpdateTodo = Partial<CreateTodo>
