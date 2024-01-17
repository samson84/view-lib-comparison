import { Component, inject } from '@angular/core';
import { Todo } from '../types/todo.type';
import { TodoListComponent } from './todo-list/todo-list.component';

import type { CreateTodo } from '../types/create-todo.type';
import type { UpdateTodoEvent } from '../types/update-todo-event.type';
import type { TodoId } from '../types/todo-id.type';

import { TodoService } from '../services/todo/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
  loading = false;
  error: Error | null = null;
  todos: Todo[] = []
  todoService = inject(TodoService)

  constructor() {
    this.loading = true
    this.todoService.readAll().subscribe({
      next: (todos) => { this.todos = todos },
      error: (error) => { this.error = error },
      complete: () => { this.loading = false }
    })
  }

  onCreate(todo: CreateTodo) {
    this.loading = true
    this.todoService.create(todo).subscribe({
      next: (created) => { this.todos.push(created) },
      error: (error) => { this.error = error },
      complete: () => { this.loading = false }
    })
  }

  onUpdate([id, updates]: UpdateTodoEvent) {
    this.loading = true
    this.todoService.update(id, updates).subscribe({
      next: (updated) => {
        this.todos = this.todos.map(
          (todo) =>
            todo.id === updated.id
              ? updated
              : todo
        )
      },
      error: (error) => { this.error = error },
      complete: () => { this.loading = false }
    })
  }

  onDelete(id: TodoId) {
    this.loading = true
    this.todoService.delete(id).subscribe({
      next: (deleted) => {
        this.todos = this.todos.filter(
          (todo) => todo.id !== deleted.id
        )
      },
      error: (error) => { this.error = error },
      complete: () => { this.loading = false }
    })
  }
}
