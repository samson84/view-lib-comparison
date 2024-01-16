import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../types/todo.type';
import { CreateTodo } from '../../types/create-todo.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = '/api/todos'
  http = inject(HttpClient)

  getAll() {
    return this.http.get<Todo[]>(this.baseUrl)
  }

  post(todo: CreateTodo) {
    return this.http.post<Todo>(this.baseUrl, todo)
  }
}
