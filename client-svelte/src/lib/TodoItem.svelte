<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Todo, UpdateTodo } from "./todo.store";
  import deleteIcon from "./delete.icon.svg";
  import cancelIcon from "./cancel.icon.svg";

  export let todo: Todo;

  let editing = false;
  let title = "";

  const dispatch = createEventDispatcher<{
    update: [string, UpdateTodo];
    delete: string;
  }>();

  const handleToggle = (todo: Todo) => {
    dispatch("update", [todo.id, { done: !todo.done }]);
  };

  const handleSave = () => {
    dispatch("update", [todo.id, { title }]);
    editing = false;
  };

  const handleDelete = () => {
    dispatch("delete", todo.id);
  };
</script>

<li class="flex gap-3 text-lg max-w-sm">
  {#if editing}
    <form
      class="flex gap-3 flex-1"  
      on:submit|preventDefault={handleSave}
    >
      <input  
        class="input input-bordered w-full"
        type="text"
        bind:value={title}
        autofocus
        required
      />
      <button
        type="button"
        title="Cancel edit"
        on:click={() => {
          editing = false;
        }}
      >
        <img src={cancelIcon} alt="Cancel Icon" />
      </button>
    </form>
  {:else}
    <div class="flex flex-1 w-full h-12 gap-3 items-center">
      <input
        type="checkbox"
        class="checkbox"
        checked={todo.done}
        on:change={() => handleToggle(todo)}
      />
      <button
        class="truncate flex-1 text-left"
        class:line-through={todo.done}
        class:text-base-300={todo.done}
        title={`Click to edit - ${todo.title}`}
        on:click={() => {
          editing = true;
          title = todo.title;
        }}
      >
        {todo.title}
      </button>
      <button on:click={handleDelete}>
        <img src={deleteIcon} alt="Delete icon" />
      </button>
    </div>
  {/if}
</li>
