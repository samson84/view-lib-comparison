import { render, screen, fireEvent } from "@testing-library/angular"

import { DisplayTodoItemComponent } from './display-todo-item.component';

describe('DisplayTodoItemComponent', () => {

  describe("title", () => {

    it("should display the TODO title", async () => {
      const todo = { id: 'abc1234', title: 'Example Todo', done: false }

      await render(DisplayTodoItemComponent, {
        componentInputs: {
          todo
        },
      })
      const titleButton = screen.getByText(todo.title)

      expect(titleButton).toBeInTheDocument()
    })

    it("should display the proper title attribute", async () => {
      const todo = { id: 'abc1234', title: 'Example Todo', done: false }

      await render(DisplayTodoItemComponent, {
        componentInputs: {
          todo
        },
      })
      const titleButton = screen.getByTitle(`Click to edit - ${todo.title}`)

      expect(titleButton).toBeInTheDocument()
    })

    describe("when clicked", () => {
      it("should emit an edit event with no details", async () => {
        const todo = { id: 'abc1234', title: 'Example Todo', done: false }
        const editMock = jest.fn()

        await render(DisplayTodoItemComponent, {
          componentInputs: {
            todo
          },
          componentOutputs: {
            edit: {
              emit: editMock
            } as any
          }
        })
        const titleButton = screen.getByText(todo.title)
        fireEvent.click(titleButton)

        expect(editMock).toHaveBeenCalledTimes(1)
        expect(editMock).toHaveBeenCalledWith()
      })
    })
  })

  describe("checkbox", () => {

    describe("when the todo is not done", () => {

      it("should display the unchecked checkbox", async () => {
        const todo = { id: 'abc1234', title: 'Example Todo', done: false }

        await render(DisplayTodoItemComponent, {
          componentInputs: {
            todo
          },
        })
        const checkbox = screen.getByRole("checkbox", { checked: false })

        expect(checkbox).toBeInTheDocument()
      })

      describe("when clicked", () => {
        it("should send an update event with done:true", async () => {
          const todo = { id: 'abc1234', title: 'Example Todo', done: false }
          const updateMock = jest.fn()

          await render(DisplayTodoItemComponent, {
            componentInputs: {
              todo
            },
            componentOutputs: {
              update: { emit: updateMock } as any
            }
          })
          const checkbox = screen.getByRole("checkbox", { checked: false })
          fireEvent.click(checkbox)

          expect(updateMock).toHaveBeenCalledTimes(1)
          expect(updateMock).toHaveBeenCalledWith([todo.id, { done: true }])
        })
      })
    })

    describe("when the todo is done", () => {

      it("should display the checked checkbox", async () => {
        const todo = { id: 'abc1234', title: 'Example Todo', done: true }

        await render(DisplayTodoItemComponent, {
          componentInputs: {
            todo
          },
        })
        const checkbox = screen.getByRole("checkbox", { checked: true })

        expect(checkbox).toBeInTheDocument()
      })

      describe("when clicked", () => {
        it("should send an update event with done:false", async () => {
          const todo = { id: 'abc1234', title: 'Example Todo', done: true }
          const updateMock = jest.fn()

          await render(DisplayTodoItemComponent, {
            componentInputs: {
              todo
            },
            componentOutputs: {
              update: { emit: updateMock } as any
            }
          })
          const checkbox = screen.getByRole("checkbox", { checked: true })
          fireEvent.click(checkbox)

          expect(updateMock).toHaveBeenCalledTimes(1)
          expect(updateMock).toHaveBeenCalledWith([todo.id, { done: false }])
        })
      })

    })
  })

  describe("delete icon", () => {

    it("should display the delete icon button", async () => {
      const todo = { id: 'abc1234', title: 'Example Todo', done: false }

      await render(DisplayTodoItemComponent, {
        componentInputs: {
          todo
        },
      })
      const deleteButton = screen.getByRole("button", { name: "Delete icon" })

      expect(deleteButton).toBeInTheDocument()
    })

    describe("when clicked", () => {
      it("should send a delete event with an id", async () => {
        const todo = { id: 'abc1234', title: 'Example Todo', done: false }
        const deleteMock = jest.fn()

        await render(DisplayTodoItemComponent, {
          componentInputs: { todo },
          componentOutputs: { delete: { emit: deleteMock } as any }
        })
        const deleteButton = screen.getByRole("button", { name: "Delete icon" })
        fireEvent.click(deleteButton)

        expect(deleteMock).toHaveBeenCalledTimes(1)
        expect(deleteMock).toHaveBeenCalledWith(todo.id)
      })
    })
  })

});
