<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { CreateTodo, Todo } from "./todo.store";
  import TodoItem from "./TodoItem.svelte";

  export let todos: Todo[];

  const dispatch = createEventDispatcher<{ create: CreateTodo }>();

  let title = "";

  const handleCreate = () => {
    dispatch("create", { title, done: false });
    title = "";
  };
</script>

<form on:submit|preventDefault={handleCreate}>
  <input
    type="text"
    placeholder="Type the Todo title here"
    bind:value={title}
  />
  <button type="submit">Add new Todo</button>
</form>
<ul>
  {#each todos as todo}
    <TodoItem {todo} on:update on:delete />
  {/each}
</ul>
