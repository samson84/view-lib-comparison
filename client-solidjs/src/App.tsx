import { Index, Show, createResource } from "solid-js"
import { readTodos } from "./todo-api"


function App() {
  const [todos] = createResource(readTodos)

  return (
    <div class="container m-0 sm:m-3 text-lg">
      <Show when={todos.loading}>
        <div class="fixed top-0 right-0">
          Loading...
        </div>
      </Show>
      <main class="flex justify-center">
        <div class="flex flex-col gap-2">
          <div>
            <h1 class="text-4xl font-bold mb-0 mt-2">
              Todo APP
            </h1>
            <h2 class="text-xl text-zinc-500 font-bold mt-0 mb-2">
              with Solid
            </h2>
          </div>
          <Show when={todos.error}>
            Oops: {todos.error.message}
          </Show>
          <Show
            when={todos() && !todos.error}
          >
            <div>
              <Index each={todos()}>{(todo) => (
                <p>{todo().title}</p>
              )}</Index>
            </div>
          </Show>
        </div>
      </main>
    </div>
  )
}

export default App
