import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../types/todo.type';
import type { CreateTodo } from '../../types/create-todo.type';
import type { UpdateTodo } from '../../types/update-todo.type';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = '/api/todos'
  http = inject(HttpClient)

  readAll() {
    return this.http.get<Todo[]>(this.baseUrl)
  }

  create(todo: CreateTodo) {
    return this.http.post<Todo>(this.baseUrl, todo)
  }

  update(id: string, updates: UpdateTodo) {
    return this.http.patch<Todo>(`${this.baseUrl}/${id}`, updates)
  }

  delete(id: string) {
    return this.http.delete<Todo>(`${this.baseUrl}/${id}`)
  }
}
