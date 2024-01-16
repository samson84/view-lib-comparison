import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo.type';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { CreateTodo } from '../todo.type';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  @Input() todos: Todo[] = []
  @Output() onCreate = new EventEmitter<CreateTodo>()
  createForm = new FormGroup({
    title: new FormControl('', {nonNullable: true})
  })

  onSubmit(event: Event) {
    event.preventDefault()
    this.onCreate.emit(this.createForm.value)
    this.createForm.reset()
  }

}
