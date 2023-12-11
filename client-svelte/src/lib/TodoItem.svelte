<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Todo, UpdateTodo } from "./todo.store";
  import EditTodoItem from "./EditTodoItem.svelte";
  import DisplayTodoItem from "./DisplayTodoItem.svelte";

  export let todo: Todo;

  let editing = false;

  const dispatch = createEventDispatcher<{
    update: [string, UpdateTodo];
  }>();

</script>

<li class="flex gap-3 text-lg max-w-sm">
  {#if editing}
    <EditTodoItem
      {todo}
      on:cancel={() => (editing = false)}
      on:update={(e) => {
        dispatch("update", e.detail);
        editing = false;
      }}
    />
  {:else}
    <DisplayTodoItem
      {todo}
      on:delete
      on:edit={() => (editing = true)}
      on:update
    />
  {/if}
</li>
