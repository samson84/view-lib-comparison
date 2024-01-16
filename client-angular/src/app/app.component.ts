import { Component, inject } from '@angular/core';
import { Todo } from '../types/todo.type';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CreateTodo } from '../types/create-todo.type';
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
    this.todoService.getAll().subscribe({
      next: (todos) => { this.todos = todos },
      error: (error) => { this.error = error },
      complete: () => { this.loading = false }
    })
  }

  onCreate(todo: CreateTodo) {
    this.loading = true
    this.todoService.post(todo).subscribe({
      next: (updated) => { this.todos.push(updated) },
      error: (error) => { this.error = error },
      complete: () => { this.loading = false }
    })
  }
}
