import { useFetch, fetcher } from "./fetcher.js";

const BASE_URL = '/api/todos'

export type Todo = {
  id: string,
  title: string,
  done: boolean
}

type UpdateTodo = Partial<Omit<Todo, 'id'>>
export const updateTodo = async (id: string, updates: UpdateTodo) => {
  return await fetcher<UpdateTodo, Todo>({
    url: `${BASE_URL}/${id}`,
    method: 'PATCH',
    body: updates
  })
}


export const useTodo = () => {
  const { data, error, loading, mutate } = useFetch<Todo[]>({ url: BASE_URL })

  const update = async (id: string, updates: UpdateTodo) => {
    return await mutate<UpdateTodo, Todo>({
      url: `${BASE_URL}/${id}`,
      method: 'PATCH',
      body: updates
    }, (updated, todos) => todos?.map(
      todo => todo.id === updated.id ? updated : todo
    ) ?? null
    )
  }

  return { todos: data, error, loading, update }
}

type CreateTodo = Omit<Todo, 'id'>
export const createTodo = async (todo: CreateTodo) => {
  return await fetcher<CreateTodo, Todo>({
    url: BASE_URL,
    method: 'POST',
    body: todo
  })
}


export const deleteTodo = async (id: string) => {
  return await fetcher<undefined, Todo>({
    url: `${BASE_URL}/${id}`,
    method: 'DELETE',
  })
}