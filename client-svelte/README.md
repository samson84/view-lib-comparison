# Svelte TODO App

## Experience

### Typescript

- Typescript support has [limitations](https://svelte.dev/docs/typescript#limitations)

- With typescript it is easier to learn a new framework. It notifies you in advance a lot of syntax error.

- It is easy and very descriptive to add types to the custom events.

### Debugging, editing

- The compiled code is hard to follow and understand, sourcemaps are needed. Debugger working properly in the browser with sourcemaps.

- The Svelte VSCode Extension provides a great a11y linter. E.g. It notifies if I try to apply an on:click event on a span. It must be a keyboard event too.

- If you accidentally declare a component prop with `const`, it is hard to debug why the component is not changing. There is no proper error message is shown in this case.

### Language features

- Component events look clean and handy, especially with event forwarding. On the other hand with large components it is a little bit hard to follow which events are forwarded.

- The svelte store looks a fine alternative to redux. It has some boilerplate. It is also needed to create different stores for the error and loading states to use it for data fetching. 

- The custom stores are great feature to handle the async operations separated from the display logic.

- I loved the eventmodifiers. `<form on:submit|preventDefault={...}>` it removes a lot of boilerplate.

- The template engine is straightforward, it is great that I can write simple html code to describe the component. It is more close to what will be displayed exactly than React (JS + JSX).

- To reduce the boilerplates, Svelte introduce a lot of shorthands, like event forwarding and automatic store subscribtions, unsubscribtions (like `$store`). It feels criptic in some cases and hides important mechanics. 

### Testing

- The testing library documentation is outdated for svelte, it recommends to use vitest-dom package, but jest-dom is the proper package, even with vitest.

- Creating basic tests are easy with svelte + vitest + testing-library.

- Testing the events are a little bit boilerplaty, `component.$on(event, mock)` is needed + the svelte's `CustomEvent` has a dynamic properties, so first it is needed to access the event object from the mock calls, after that we can reach the properties, like `event.detail`.
