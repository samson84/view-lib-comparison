import ky from 'ky';
import { Todo } from './todo.type';

const BASE_URL = '/api/todos'

export const readTodos = async () => {
  return await ky.get(BASE_URL).json<Todo[]>() 
}