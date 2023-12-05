import { SyntheticEvent, useState } from "react"
import type { Todo, UpdateTodo } from "../todo-api"
import VerticalBox from "./VerticalBox"

const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
const CancelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg>

type TodoItemProps = {
  todo: Todo,
  onUpdate: (changes: UpdateTodo) => void
  onDelete: () => void
}
export default function TodoItem({ 
  todo, 
  onUpdate, 
  onDelete 
}: TodoItemProps) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState("")

  const handleEdit = () => {
    setEditing(true)
    setTitle(todo.title)
  }

  const handleSave = (event: SyntheticEvent) => {
    event.preventDefault()
    setEditing(false)
    onUpdate({ title })
  }

  return (
    <VerticalBox>
      {editing ? (
        <div className="flex items-center gap-3 h-12 w-80">
          <form onSubmit={handleSave}>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Todo title"
              className="input input-bordered  w-full max-w-xs"
            />
          </form>
          <span
            className="cursor-pointer"
            onClick={() => setEditing(false)}
            title="Cancel changes"
          >
            <CancelIcon />
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-3 h-12 w-80">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.done}
            onChange={() => onUpdate({ done: !todo.done })}
          />
          <h4 
            className={`m-0 grow truncate ${todo.done ? 'text-neutral-content line-through': ''}`} 
            title={todo.title}
            onClick={handleEdit}
          >
            {todo.title}
          </h4>
          <span 
            className="cursor-pointer"
            title="Delete todo"
            onClick={() => onDelete()}
          >
            <DeleteIcon />
          </span>
        </div>
      )}
    </VerticalBox>
  )
}