<script lang="ts">
  import { onMount } from "svelte";
  import { todos, loading, error } from "./lib/todo.store.js";

  onMount(async () => {
    await todos.getTodos()
  });
</script>

<main>
  <h1>Todo APP</h1>
  <h2>with Svelte</h2>
  {#if $loading}
    Loading
  {:else if $error}
    Ooops, something went wrong. 
  {:else}
  <ul>
    {#each $todos as todo}
      <li>{todo.title}</li>
    {/each}
  </ul>
  {/if}
</main>

<style>
</style>
