# Svelte TODO App

## Experience

### Typescript

- Typescript support has [limitations](https://svelte.dev/docs/typescript#limitations)
- With typescript it is easier to learn a new framework. It notifies you in advance a lot of syntax error.

### Debugging, editing

- The compiled code is hard to follow and understand, sourcemaps are needed. Debugger working properly in the browser with sourcemaps.

- The Svelte VSCode Extension provides a great a11y linter. E.g. It notifies if I try to apply an on:click event on a span. It must be a keyboard event too.

### Language features

- Component events look clean and handy, especially with event forwarding. On the other hand with large components it is a little bit hard to follow which events are forwarded.

- The svelte store looks a fine alternative to redux. It has some boilerplate. It is also needed to create different stores for the error and loading states to use it for data fetching. 

- The custom stores are great feature to handle the async operations separated from the display logic.

- I loved the eventmodifiers. `<form on:submit|preventDefault={...}>` it removes a lot of boilerplate.

### Testing

- The testing library documentation is outdated for svelte, it recommends to use vitest-dom package, but jest-dom is the proper package, even with vitest.

- Creating basic tests are easy with svelte + vitest + testing-library.

- Testing the events are a little bit boilerplaty, `component.$on(event, mock)` is needed + the svelte's `CustomEvent` has a dynamic properties, so first it is needed to access the event object from the mock calls, after that we can reach the properties, like `event.detail`.
