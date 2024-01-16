import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../types/todo.type';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import type { CreateTodo } from '../../types/create-todo.type';

import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ReactiveFormsModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  @Input() todos: Todo[] = []
  @Output() onCreate = new EventEmitter<CreateTodo>()
  createForm = new FormGroup({
    title: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true
    })
  })

  onSubmit(event: Event) {
    event.preventDefault()
    this.onCreate.emit({
      title: this.createForm.value.title!,
      done: false 
    })
    this.createForm.reset()
  }

}
