import '@testing-library/jest-dom'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/svelte'

import DisplayTodoItem from './DisplayTodoItem.svelte'

describe("DisplayTodoItem", () => {
  afterEach(() => { vi.restoreAllMocks() })

  describe("title", () => {

    it("should display the TODO title", () => {
      const todo = {
        id: "someId",
        title: "My Todo",
        done: false
      }

      render(DisplayTodoItem, { todo })
      const titleButton = screen.getByRole('button', { name: todo.title })

      expect(titleButton).toBeInTheDocument()
    })

    it("should display the proper title attribute", () => {
      const todo = {
        id: "someId",
        title: "My Todo",
        done: false
      }

      render(DisplayTodoItem, { todo })
      const titleButton = screen.getByTitle(`Click to edit - ${todo.title}`)

      expect(titleButton).toBeInTheDocument()
    })

    describe("when clicked", () => {
      it("should emit an edit event with no details", () => {
        const todo = {
          id: "someId",
          title: "My Todo",
          done: false
        }
        const editMock = vi.fn()

        const { component } = render(DisplayTodoItem, { todo })
        component.$on("edit", editMock)
        const titleButton = screen.getByRole('button', { name: todo.title })
        fireEvent.click(titleButton)

        const [[event]] = editMock.mock.calls
        expect(editMock).toHaveBeenCalledOnce()
        expect(event.detail).toBeNull()
      })
    })
  })

  describe("checkbox", () => {

    describe("when the todo is not done", () => {

      it("should display the unchecked checkbox", () => {
        const todo = {
          id: "someId",
          title: "My Todo",
          done: false
        }

        render(DisplayTodoItem, { todo })
        const checkbox = screen.getByRole("checkbox", { checked: false })

        expect(checkbox).toBeInTheDocument()
      })

      describe("when clicked", () => {
        it("should send an update event with done:true", () => {
          const todo = {
            id: "someId",
            title: "My Todo",
            done: false

          }
          const updateMock = vi.fn()

          const { component } = render(DisplayTodoItem, { todo })
          component.$on('update', updateMock)
          const checkbox = screen.getByRole("checkbox", { checked: false })
          fireEvent.click(checkbox)

          const [[event]] = updateMock.mock.calls
          expect(event.detail).toEqual([todo.id, { done: true }])
        })
      })
    })

    describe("when the todo is done", () => {

      it("should display the checked checkbox", () => {
        const todo = {
          id: "someId",
          title: "My Todo",
          done: true

        }

        render(DisplayTodoItem, { todo })
        const checkbox = screen.getByRole("checkbox", { checked: true })

        expect(checkbox).toBeInTheDocument()
      })

      describe("when clicked", () => {
        it("should send an update event with done:false", () => {
          const todo = {
            id: "someId",
            title: "My Todo",
            done: true

          }
          const updateMock = vi.fn()

          const { component } = render(DisplayTodoItem, { todo })
          component.$on('update', updateMock)
          const checkbox = screen.getByRole("checkbox", { checked: true })
          fireEvent.click(checkbox)

          const [[event]] = updateMock.mock.calls
          expect(event.detail).toEqual([todo.id, { done: false }])
        })
      })

    })

  })

  describe("delete icon", () => {

    it("should display the delete icon button", () => {
      const todo = {
        id: "someId",
        title: "My Todo",
        done: true

      }

      render(DisplayTodoItem, { todo })
      const deleteButton = screen.getByRole("button", { name: "Delete icon" })
      expect(deleteButton).toBeInTheDocument()
    })

    describe("when clicked", () => {
      it("should send a delete event with an id", () => {
        const todo = {
          id: "someId",
          title: "My Todo",
          done: true

        }
        const deleteMock = vi.fn()

        const { component } = render(DisplayTodoItem, { todo })
        component.$on('delete', deleteMock)
        const deleteButton = screen.getByRole("button", { name: "Delete icon" })
        fireEvent.click(deleteButton)

        const [[event]] = deleteMock.mock.calls
        expect(event.detail).toEqual(todo.id)
      })
    })
  })
})