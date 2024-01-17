import { TodoId } from "./todo-id.type";
import { UpdateTodo } from "./update-todo.type";

export type UpdateTodoEvent = [TodoId, UpdateTodo]