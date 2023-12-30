import { writable } from "svelte/store";
import { fetcher } from "./fetcher";

const TODO_API_BASE_URL = import.meta.env.VITE_TODO_API_BASE_URL ?? ''
const BASE_URL = `${TODO_API_BASE_URL}/api/todos`

export type Todo = {
  id: string
  title: string
  done: boolean
}

export type CreateTodo = Omit<Todo, 'id'>
export type UpdateTodo = Partial<CreateTodo>

const ifError = (error: unknown, fn: (error: Error) => void) => {
  if (error instanceof Error) {
    fn(error)
  } else {
    throw error
  }
}

const createError = () => {
  const { subscribe, set } = writable<Error | null>(null)

  const error = { subscribe }
  return { error, setError: set }
}

const createLoading = () => {
  const { subscribe, set } = writable(false)

  const loading = { subscribe }
  return { loading, setLoading: set }
}

const { error, setError } = createError()
const { loading, setLoading } = createLoading()

const createTodos = () => {
  const { subscribe, update, set } = writable<Todo[]>([])

  return {
    subscribe,
    async readAll() {
      try {
        setLoading(true)
        const todos = await fetcher<undefined, Todo[]>({ url: BASE_URL })
        setError(null)
        set(todos)
      } catch (error) {
        ifError(error, (e) => setError(e))
      } finally {
        setLoading(false)
      }
    },
    async update(id: string, updates: UpdateTodo) {
      try {
        setLoading(true)
        const updated = await fetcher<UpdateTodo, Todo>({
          url: `${BASE_URL}/${id}`,
          method: 'PATCH',
          body: updates
        })
        setError(null)
        update(items => items.map(item => updated.id === item.id ? updated : item))
      } catch (error) {
        ifError(error, (e) => setError(e))
      } finally {
        setLoading(false)
      }
    },
    async create(todo: CreateTodo) {
      try {
        setLoading(true)
        const created = await fetcher<CreateTodo, Todo>({
          url: BASE_URL,
          method: 'POST',
          body: todo
        })
        setError(null)
        update((items) => [...items, created])
      } catch (error) {
        ifError(error, (e) => setError(e))
      } finally {
        setLoading(false)
      }
    },
    async delete(id: string) {
      try {
        setLoading(true)
        const deleted = await fetcher<undefined, Todo>({
          url: `${BASE_URL}/${id}`,
          method: 'DELETE'
        })
        setError(null)
        update((items) => items.filter(item => item.id !== deleted.id))
      } catch (error) {
        ifError(error, (e) => setError(e))
      } finally {
        setLoading(false)
      }
    }
  }
}
export const todos = createTodos()

export { error, loading }



