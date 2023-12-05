import Error from "./components/Error"
import Loading from "./components/Loading"
import Todos from "./components/Todos"
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
    <>
      <div className="fixed top-0 right-0">
        {loading && <Loading />}
      </div>
      <div className="h-screen flex items-center justify-center flex-col">
        <div className="prose">
          <h1 className="m-0">TODO App</h1>
          <p>with React Client</p>
        </div>
        <div className="">
          {error && <Error message={error.message} />}
          {todos && (
            <Todos
              todos={todos}
              onUpdate={handleUpdate}
              onAdd={handleCreate} 
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default App
