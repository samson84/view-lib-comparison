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

<div class="flex flex-col gap-3">
  <form
    class="flex gap-2 flex-col sm:flex-row" 
    on:submit|preventDefault={handleCreate}
  >
    <input
      class="input input-bordered"
      type="text"
      placeholder="Type the Todo title here"
      required
      bind:value={title}
    />
    <button type="submit" class="btn">Add new Todo</button>
  </form>
  <ul>
    {#each todos as todo}
      <TodoItem {todo} on:update on:delete />
    {/each}
  </ul>
</div>
