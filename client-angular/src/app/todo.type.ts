export type Todo = {
  id: string
  done: boolean
  title: string
}

export type CreateTodo = Partial<Omit<Todo, 'id'>>
