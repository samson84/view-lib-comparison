import { render, screen, fireEvent } from "@testing-library/angular"
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw';

import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core'

import { AppComponent } from './app.component';
import { ConfigService } from "../services/config.services";

const BASE_URL = 'http://localhost'

const restHandlers = [
  http.get(`${BASE_URL}/api/todos`, () => (
    HttpResponse.json([{ id: 'someId1', title: 'Todo1', done: false }])
  ))
]

const server = setupServer(...restHandlers)

describe('AppComponent', () => {
  beforeAll(() => { server.listen() })
  afterEach(() => { server.resetHandlers() })
  afterAll(() => { server.close() })

  it('should display the Todos', async () => {
    await render(AppComponent, {
      imports: [HttpClientModule],
      componentProviders: [
        {
          provide: ConfigService,
          useValue: {
            BASE_URL
          }
        }
      ]
    })

    const todo = await screen.findByText('Todo1')
    expect(todo).toBeInTheDocument()
  })
})