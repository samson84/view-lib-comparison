import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EditTodoItemComponent } from '../edit-todo-item/edit-todo-item.component';
import { DisplayTodoItemComponent } from '../display-todo-item/display-todo-item.component';
import type { Todo } from '../../types/todo.type';
import type { UpdateTodoEvent } from '../../types/update-todo-event.type';
import type { TodoId } from '../../types/todo-id.type';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [EditTodoItemComponent, DisplayTodoItemComponent],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Output() update = new EventEmitter<UpdateTodoEvent>()
  @Output() delete = new EventEmitter<string>()
  
  editing = false;
  
  onUpdate(event: UpdateTodoEvent) { 
    this.update.emit(event)
    this.editing = false; 
  }
  
  onDelete(id: TodoId) { this.delete.emit(id) }
  
  onEdit() { this.editing = true }

  onCancelEdit() { this.editing = false }
}
