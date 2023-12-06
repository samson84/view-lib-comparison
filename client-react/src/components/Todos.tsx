import { SyntheticEvent, useId, useState } from "react"
import type { CreateTodo, Todo, UpdateTodo } from "../todo-api"
import TodoItem from "./TodoItem"
import VerticalBox from "./VerticalBox"

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

  const handleAdd = (event: SyntheticEvent) => {
    event.preventDefault()
    if(title === "") {
      return
    }
    setTitle("")
    onAdd({
      title,
      done: false,
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <VerticalBox>
        <form onSubmit={handleAdd}>
          <label htmlFor={addTodoInputId} className="label">
            <span className="label-text">Add a new todo</span>
          </label>
          <input
            id={addTodoInputId}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Type title here"
            className="input input-bordered w-full max-w-xs"
          />
        </form>
      </VerticalBox>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={(updates) => handleUpdate(todo.id, updates)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </div>
  )
}