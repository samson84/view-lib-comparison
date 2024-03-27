# Solid.js

## Feature Set

- [ ] REST HTTP communication: The client must read, update, delete and create a Todo.
- [ ] Parent-Child component communication.
- [ ] Shared data store/service usage.
- [ ] Styling: Tailwind CSS.
- [ ] Testing: Jest or Vitest + DOM-based Testing Library, HTTP mocking: MSW
- [ ] Low-level component testing: A simple but interactive component must have a test suit with good test coverage. The component does not initiate HTTP requests.
- [ ] High-level component testing: The main component (it initiates HTTP requests) must have an example test to demonstrate a successful mocking of the HTTP calls.

## Experience

### Learning Curve

- It looks similar to React so I hoped steep learning curve. But because of the "fine-grained reactivity" and the performance optimizations (lazy loading child components, proxies) it looks much more complicated to do even simple things. And there are a lot of rules, you have to keep in mind. 
- You also need a deep understanding of how the internal reactivity is working, there is not a good abstraction/mental model you can rely on. In React components are functions, and you can use their arguments to manipulate them. In Angular, components are classes, you can use its props and methods to manipulate them. In Solid.js component's initial state is described with a function, and you have reactive primitives and reactive scopes. They are put together with the help of the compiler to create the component's update logic.
- Fine graned reactivity is not easy: https://angularindepth.com/posts/1289/solidjs-reactivity-to-rendering, https://dev.to/ryansolid/a-hands-on-introduction-to-fine-grained-reactivity-3ndf

### Documentation

- I liked the two short videos to understand the main concept of Solid.js.
- Unfortunately, the "new" tutorial for the beginner link is broken.
- Even the beginner documentation shows details about how the framework is working under the hood without digging into the details.
- The beta tutorial looks useful to dig into the details, but the learning part misses the try-out examples and it is more theoretical in several aspects. It repeats a lot and unfortunately, the examples have failures and some links are broken.
- The tutorial did not explain well why the Dynamic component is needed.
- ErrorBoundary component typically gets an error in the fallback prop, but when a component tries to display it, it remains hidden, and only a tiny warning tells us why.

### Tooling

### Framework Features

- The `mergeProps()` and `splitProps()` utilities are strange at first. On the component's props is not ok to use some built-in JS features like `Object.assign()`, rest and spread operators.

### Testing

## Bottom Line