import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../types/todo.type';
import type { UpdateTodoEvent } from '../../types/update-todo-event.type';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-todo-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-todo-item.component.html',
})
export class EditTodoItemComponent {
  @Input({required: true}) todo!: Todo;
  @Output() cancel = new EventEmitter<undefined>()
  @Output() update = new EventEmitter<UpdateTodoEvent>()
  updateForm = new FormGroup({
    title: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    })
  })

  ngOnInit() {
    this.updateForm.setValue({title: this.todo.title})
  }

  onCancel() {
    this.cancel.emit()
  }

  onSubmit(event: Event) {
    event.preventDefault()
    this.update.emit([
      this.todo.id, 
      {title: this.updateForm.value.title!}
    ])
  }
}
