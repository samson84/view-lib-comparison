import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTodoItemComponent } from './display-todo-item.component';

describe('DisplayTodoItemComponent', () => {
  let component: DisplayTodoItemComponent;
  let fixture: ComponentFixture<DisplayTodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayTodoItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
