<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Todo, UpdateTodo } from "./todo.store";

  export let todo: Todo;

  let editing = false;
  let title = "";

  const dispatch = createEventDispatcher<{ 
    update: [string, UpdateTodo],
    delete: string
  }>();

  const handleToggle = (todo: Todo) => {
    dispatch("update", [todo.id, { done: !todo.done }]);
  };

  const handleSave = () => {
    dispatch("update", [todo.id, { title }]);
  };

  const handleDelete = () => {
    dispatch("delete", todo.id)
  }
</script>

<li>
  {#if editing}
    <form on:submit|preventDefault={handleSave}>
      <input type="text" bind:value={title} required />
      <button
        type="button"
        on:click={() => {
          editing = false;
        }}>Cancel</button
      >
    </form>
  {:else}
    <input
      type="checkbox"
      checked={todo.done}
      on:change={() => handleToggle(todo)}
    />
    <button
      on:click={() => {
        editing = true;
        title = todo.title;
      }}
    >
      {todo.title}
    </button>
    <button on:click={handleDelete}>
      Delete
    </button>
  {/if}
</li>
