<script lang="ts">
  import { onMount } from "svelte";
  import { todos, loading, error, type UpdateTodo, type CreateTodo } from "./lib/todo.store.js";
  import TodoList from "./lib/TodoList.svelte";

  onMount(async () => {
    await todos.readAll();
  });

  const handleUpdate = async (event: CustomEvent<[string, UpdateTodo]>) => {
    const [id, updates] = event.detail
    await todos.update(id, updates)
  };

  const handleCreate = async (event: CustomEvent<CreateTodo>) => {
    const todo = event.detail
    await todos.create(todo)
  }
</script>

<main>
  <h1>Todo APP</h1>
  <h2>with Svelte</h2>
  {#if $loading}
    Loading
  {:else if $error}
    Ooops, something went wrong.
  {:else}
    <TodoList 
      todos={$todos}
      on:update={handleUpdate}
      on:create={handleCreate}
    />
  {/if}
</main>

<style>
</style>
