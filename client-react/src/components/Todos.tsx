import type { Todo } from "../todo-api"
import TodoItem from "./TodoItem"

type TodosProps = {
  todos: Todo[]
  onUpdate: (id: string, updates: Partial<Todo>) => void
}

export default function Todos({ todos, onUpdate }: TodosProps) {
  const handleToogle = (id: string, change: boolean) => {
    onUpdate(id, {done: change})
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={(change) => handleToogle(todo.id, change)} />
      ))}
    </div>
  )
}