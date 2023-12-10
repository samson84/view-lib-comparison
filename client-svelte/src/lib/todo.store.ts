import { writable } from "svelte/store";
import { fetcher } from "./fetcher";

const BASE_URL = '/api/todos'

export type Todo = {
  id: string
  title: string
  done: boolean
}

export type CreateTodo = Omit<Todo, 'id'>
export type UpdateTodo = Partial<CreateTodo>

const createError = () => {
  const { subscribe, set } = writable<Error | null>(null)

  const error = { subscribe }
  return {error, setError: set}
}

const createLoading = () => {
  const { subscribe, set } = writable(false)

  const loading = { subscribe }
  return {loading, setLoading: set}
}

const {error, setError} = createError()
const {loading, setLoading} = createLoading()

const createTodos = () => {
  const { subscribe, update, set } = writable<Todo[]>([])
  return {
    subscribe,
    async getTodos() {
      try {
        setLoading(true)
        const todos = await fetcher<undefined, Todo[]>({url: BASE_URL})
        set(todos)
      } catch (error) {
        if (error instanceof Error) {
          setError(error)
        } else {
          throw Error
        }
      } finally {
        setLoading(false)
      }
    }
  }
}
export const todos = createTodos()

export { error, loading }



