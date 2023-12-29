import { useState } from "react"
import type { Todo, UpdateTodo } from "../todo-api"
import EditTodoItem from "./EditTodoItem"
import DisplayTodoItem from "./DisplayTodoItem"

type TodoItemProps = {
  todo: Todo,
  onUpdate: (updates: UpdateTodo) => void
  onDelete: () => void
}
export default function TodoItem({ 
  todo, 
  onUpdate, 
  onDelete 
}: TodoItemProps) {
  const [editing, setEditing] = useState(false)

  const handleSave = (updates: UpdateTodo) => {
    setEditing(false)
    onUpdate(updates)
  }

  return (
    <li className="flex gap-3 text-lg max-w-sm">
      {editing ? (
        <EditTodoItem 
          todo={todo}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <DisplayTodoItem 
          todo={todo}
          onDelete={onDelete}
          onEdit={() => setEditing(true)}
          onUpdate={onUpdate}
        />
      )}
    </li>
  )
}