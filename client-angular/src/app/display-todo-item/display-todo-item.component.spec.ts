import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen, fireEvent } from "@testing-library/angular"

import { DisplayTodoItemComponent } from './display-todo-item.component';


describe('DisplayTodoItemComponent', () => {

  describe('not checked todo', () => {
    it('it should display the todo', async () => {
      const todo = {id: 'abc1234', title: 'Example Todo', done: false} 
  
      await render(DisplayTodoItemComponent, {
        componentInputs: {
          todo
        },
      })
      const title = screen.getByText(todo.title)
  
      expect(title).toBeInTheDocument()
    });
  })
});
