import { useFetch, fetcher } from "./fetcher.js";

const BASE_URL = '/api/todos'

export type Todo = {
  id: string,
  title: string,
  done: boolean
}

export type UpdateTodo = Partial<Omit<Todo, 'id'>>
export type CreateTodo = Omit<Todo, 'id'>

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

  const create = async (todo: CreateTodo) => {
    return await mutate<CreateTodo, Todo>({
      url: BASE_URL,
      method: 'POST',
      body: todo
    }, (created, todos) => todos === null ? [created] : [...todos, created])  
  }

  const remove = async (id: string) => {
    return await mutate<undefined, Todo>({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
    }, (deleted, todos) => todos?.filter((todo) => todo.id !== deleted.id) ?? null)
  }

  return { todos: data, error, loading, update, create, remove }
}
