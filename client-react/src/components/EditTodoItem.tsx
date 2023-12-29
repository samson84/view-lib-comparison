import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Todo, UpdateTodo } from "../todo-api";

const CancelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg>

type EditTodoItemProps = {
  todo: Todo,
  onSave: (updates: UpdateTodo) => void
  onCancel: () => void
}
export default function EditTodoItem({
  todo,
  onSave,
  onCancel
}: EditTodoItemProps) {
  const [title, setTitle] = useState(todo.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  const handleSave = (event: SyntheticEvent) => {
    event.preventDefault()
    onSave({ title })
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <form onSubmit={handleSave}>
      <input
        className="input input-bordered w-full"
        ref={inputRef}
        required
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Todo title"
      />
      <button
        className="cursor-pointer"
        onClick={onCancel}
        title="Cancel edit"
      >
        <CancelIcon />
      </button>
    </form>
  )
}