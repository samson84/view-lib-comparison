import Error from "./components/Error"
import Loading from "./components/Loading"
import Todos from "./components/Todos"
import { Todo, useTodo } from "./todo-api"

function App() {
  const { todos, error, loading, update } = useTodo()

  const handleUpdate = async (id: string, updates: Partial<Todo>) => {
    await update(id, updates)
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
        <div className="flex">
          {error && <Error message={error.message} />}
          {todos && <Todos todos={todos} onUpdate={handleUpdate} />}
        </div>
      </div>
    </>
  )
}

export default App
