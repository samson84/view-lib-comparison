import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Todo } from '../../types/todo.type';
import type { UpdateTodoEvent } from '../../types/update-todo-event.type';
import type { TodoId } from '../../types/todo-id.type';

@Component({
  selector: 'app-display-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './display-todo-item.component.html',
})
export class DisplayTodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Output() update = new EventEmitter<UpdateTodoEvent>()
  @Output() delete = new EventEmitter<TodoId>() 
  @Output() edit = new EventEmitter<undefined>()

  onToggle() {
    this.update.emit([this.todo.id, {done: !this.todo.done}])
  }

  onDelete() {
    this.delete.emit(this.todo.id)
  }

  onEdit() {
    this.edit.emit()
  }
}
