import { Component, Input } from '@angular/core';

import { EditTodoItemComponent } from '../edit-todo-item/edit-todo-item.component';
import { DisplayTodoItemComponent } from '../display-todo-item/display-todo-item.component';
import type { Todo } from '../../types/todo.type';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [EditTodoItemComponent, DisplayTodoItemComponent],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo: Todo|null = null;
  editing = false;
}
