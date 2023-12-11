<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import cancelIcon from "./cancel.icon.svg";
  import type { Todo, UpdateTodo } from "./todo.store";

  export let todo: Todo;

  const dispatch = createEventDispatcher<{
    cancel: undefined;
    update: [string, UpdateTodo];
  }>();

  let title = todo.title ?? ''

  const focus = (node:HTMLElement) => node.focus()

</script>

<form
  class="flex gap-3 flex-1"
  on:submit|preventDefault={() => dispatch("update", [todo.id, { title }])}
>
  <input
    use:focus
    class="input input-bordered w-full"
    type="text"
    bind:value={title}
    required
  />
  <button
    type="button"
    title="Cancel edit"
    on:click={() => dispatch('cancel')}
  >
    <img src={cancelIcon} alt="Cancel Icon" />
  </button>
</form>
