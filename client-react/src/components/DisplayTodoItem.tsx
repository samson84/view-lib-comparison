import { Todo, UpdateTodo } from "../todo-api"

const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>

type DisplayTodoItemProps = {
  todo: Todo,
  onUpdate: (updates: UpdateTodo) => void
  onEdit: () => void
  onDelete: () => void
}

export default function DisplayTodoItem({
  todo,
  onUpdate,
  onEdit,
  onDelete
}: DisplayTodoItemProps) {
  return (
    <div className="flex items-center gap-3 h-12 w-80">
    <input
      type="checkbox"
      className="toggle"
      checked={todo.done}
      onChange={() => onUpdate({done: !todo.done})}
    />
    <h4 
      className={`m-0 grow truncate ${todo.done ? 'text-neutral-content line-through': ''}`} 
      title={todo.title}
      onClick={onEdit}
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

  ) 
}