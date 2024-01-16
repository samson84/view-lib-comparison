import { Component } from '@angular/core';
import { Todo } from './todo.type';
import { TodoListComponent } from './todo-list/todo-list.component';

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
  todos: Todo[] = [
    {
      id: '123',
      title: 'Example',
      done: false
    },
    {
      id: '456',
      title: 'Example 2',
      done: true
    },
  ]
}
