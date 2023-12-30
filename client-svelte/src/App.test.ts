import { afterAll, afterEach, beforeAll, describe, it, expect, beforeEach } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'
import { render, screen } from '@testing-library/svelte'
import App from './App.svelte'

const BASE_URL = import.meta.env.VITE_TODO_API_BASE_URL ?? ''

const restHandlers = [
  http.get(`${BASE_URL}/api/todos`, () => {
    return HttpResponse.json([{ id: 'someId1', title: 'Todo1', done: false }])
  })
]

const server = setupServer(...restHandlers)

describe("App", () => {
  beforeAll(() => { server.listen() })
  afterEach(() => { 
    server.resetHandlers()
  })
  beforeEach(() => {  })
  afterAll(() => { server.close() })

  it("should display the Todos", async () => {
    render(App)

    const todo = await screen.findByText('Todo1')
    expect(todo).toBeInTheDocument()
  })

})