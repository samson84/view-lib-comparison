import Error from "./components/Error"
import Loading from "./components/Loading"
import TodoList from "./components/TodoList"
import { CreateTodo, Todo, useTodo } from "./todo-api"

function App() {
  const { todos, error, loading, update, remove, create } = useTodo()

  const handleUpdate = async (id: string, updates: Partial<Todo>) => {
    await update(id, updates)
  }

  const handleCreate = async (todo: CreateTodo) => {
    await create(todo)
  }

  const handleDelete = async (id: string) => {
    await remove(id)
  }

  return (
    <div className="container m-0 sm:m-3 text-lg">
      <div className="fixed top-0 right-0">
        {loading && <Loading />}
      </div>
      <main className="flex justify-center">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-4xl font-bold mb-0 mt-2">TODO App</h1>
            <h2 className="text-xl text-zinc-500 font-bold mt-0 mb-2">with React Client</h2>
          </div>
            {error && <Error message={error.message} />}
            {todos && !error &&(
              <div>
                <TodoList
                  todos={todos}
                  onUpdate={handleUpdate}
                  onAdd={handleCreate}
                  onDelete={handleDelete}
                />
              </div>
            )}
        </div>
      </main>
    </div>
  )
}

export default App
