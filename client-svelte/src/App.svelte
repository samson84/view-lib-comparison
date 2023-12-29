<script lang="ts">
  import { onMount } from "svelte";
  import {
    todos,
    loading,
    error,
    type UpdateTodo,
    type CreateTodo,
  } from "./lib/todo.store.js";
  import TodoList from "./lib/TodoList.svelte";
  import ErrorMessage from "./Error.svelte";
  import Loading from "./Loading.svelte";

  onMount(async () => {
    await todos.readAll();
  });

  const handleUpdate = async (event: CustomEvent<[string, UpdateTodo]>) => {
    const [id, updates] = event.detail;
    await todos.update(id, updates);
  };

  const handleCreate = async (event: CustomEvent<CreateTodo>) => {
    const todo = event.detail;
    await todos.create(todo);
  };

  const handleDelete = async (event: CustomEvent<string>) => {
    const id = event.detail;
    await todos.delete(id);
  };
</script>

<div class="container m-0 sm:m-3 text-lg">
  {#if $loading}
    <div class="fixed top-0 right-0">
      <Loading />
    </div>
  {/if}
  <main class="flex justify-center">
    <div class="flex flex-col gap-2">
      <div>
        <h1 class="text-4xl font-bold mb-0 mt-2">Todo APP</h1>
        <h2 class="text-xl text-zinc-500 font-bold mt-0 mb-2">with Svelte</h2>
      </div>
      {#if $error}
        <ErrorMessage message={$error.message} />
      {/if}
      {#if $todos && !$error}
        <div>
          <TodoList
            todos={$todos}
            on:update={handleUpdate}
            on:create={handleCreate}
            on:delete={handleDelete}
          />
        </div>
      {/if}
    </div>
  </main>
</div>

<style>
</style>
