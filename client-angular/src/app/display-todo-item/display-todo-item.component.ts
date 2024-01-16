import { Component, Input } from '@angular/core';
import type { Todo } from '../../types/todo.type';

@Component({
  selector: 'app-display-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './display-todo-item.component.html',
  styleUrl: './display-todo-item.component.css'
})
export class DisplayTodoItemComponent {
  @Input() todo: Todo|null = null;

}
