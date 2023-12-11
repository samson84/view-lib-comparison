<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import deleteIcon from "./delete.icon.svg";
  import type { Todo, UpdateTodo } from "./todo.store";

  const dispatch = createEventDispatcher<{
    edit: undefined
    update: [string, UpdateTodo]
    delete: string
  }>()

  export let todo: Todo;
</script>

<div class="flex flex-1 w-full h-12 gap-3 items-center">
  <input
    type="checkbox"
    class="checkbox"
    checked={todo.done}
    on:change={() => dispatch("update", [todo.id, {done: !todo.done}])}
  />
  <button
    class="truncate flex-1 text-left"
    class:line-through={todo.done}
    class:text-base-300={todo.done}
    title={`Click to edit - ${todo.title}`}
    on:click={() => dispatch("edit")}
  >
    {todo.title}
  </button>
  <button on:click={() => dispatch("delete", todo.id)}>
    <img src={deleteIcon} alt="Delete icon" />
  </button>
</div>
