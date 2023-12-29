import { SyntheticEvent, useId, useState } from "react"
import type { CreateTodo, Todo, UpdateTodo } from "../todo-api"
import TodoItem from "./TodoItem"

type TodosProps = {
  todos: Todo[]
  onUpdate: (id: string, updates: UpdateTodo) => void
  onAdd: (todo: CreateTodo) => void
  onDelete: (id: string) => void
}
export default function Todos({
  todos,
  onUpdate,
  onAdd,
  onDelete
}: TodosProps) {
  const addTodoInputId = useId()
  const [title, setTitle] = useState("")

  const handleUpdate = (id: string, updates: UpdateTodo) => {
    onUpdate(id, updates)
  }

  const handleCreate = (event: SyntheticEvent) => {
    event.preventDefault()
    if (title === "") {
      return
    }
    setTitle("")
    onAdd({
      title,
      done: false,
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <form
        className="flex gap-2 flex-col sm:flex-row"
        onSubmit={handleCreate}
      >
        <input
          className="input input-bordered"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          required
          placeholder="Type title here"
        />
        <button type="submit" className="btn">Add new Todo</button>
      </form>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={(updates) => handleUpdate(todo.id, updates)}
            onDelete={() => onDelete(todo.id)}
          />
        ))}
      </ul>
    </div>
  )
}