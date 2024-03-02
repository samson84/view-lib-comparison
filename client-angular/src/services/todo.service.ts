import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../types/todo.type';
import type { CreateTodo } from '../types/create-todo.type';
import type { UpdateTodo } from '../types/update-todo.type';
import { ConfigService } from './config.services';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  config = inject(ConfigService)
  basePath = `${this.config.BASE_URL}/api/todos`
  http = inject(HttpClient)

  readAll() {
    return this.http.get<Todo[]>(this.basePath)
  }

  create(todo: CreateTodo) {
    return this.http.post<Todo>(this.basePath, todo)
  }

  update(id: string, updates: UpdateTodo) {
    return this.http.patch<Todo>(`${this.basePath}/${id}`, updates)
  }

  delete(id: string) {
    return this.http.delete<Todo>(`${this.basePath}/${id}`)
  }
}
