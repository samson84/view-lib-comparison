<script lang="ts">
  import { onMount } from "svelte";
  import { todos, loading, error, type UpdateTodo } from "./lib/todo.store.js";
  import TodoList from "./lib/TodoList.svelte";

  onMount(async () => {
    await todos.readAll();
  });

  const handleUpdate = async (event: CustomEvent<[string, UpdateTodo]>) => {
    const [id, updates] = event.detail
    await todos.update(id, updates)
  };
</script>

<main>
  <h1>Todo APP</h1>
  <h2>with Svelte</h2>
  {#if $loading}
    Loading
  {:else if $error}
    Ooops, something went wrong.
  {:else}
    <TodoList todos={$todos} on:update={handleUpdate} />
  {/if}
</main>

<style>
</style>
