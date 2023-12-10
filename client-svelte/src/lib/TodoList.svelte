<script lang="ts">
  import type { Todo } from "./todo.store";
  import TodoItem from "./TodoItem.svelte";

  export let todos: Todo[];
</script>

<ul>
  {#each todos as todo}
    <TodoItem {todo} on:update />
  {/each}
</ul>
