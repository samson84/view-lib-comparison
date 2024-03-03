# Comparing UI libraries/frameworks

This is a loved learning project. The goal is to compare different UI solutions with each other with a complex enough but limited feature set to cover everyday development challenges. My primary framework is React, I worked a lot on it to create production-ready applications. I wanted some hands-on experience with the other frameworks.

## The base application

It is a basic Todo App. The user can:

- get the current Todos from the server,
- create new a Todo,
- check or uncheck a specific Todo,
- change the title of the specific Todo,
- (hard) delete a Todo. 

The server is common for all projects (so I do not dig into meta frameworks for now). The server provides CRUD operations through HTTP
for a single Todo resource. It has in-memory storage, when it is restarted all the Todos are set back to a default.

## Feature set

- [ ] REST HTTP communication: The client must read, update, delete and create a Todo.
- [ ] Parent-Child component communication.
- [ ] Shared data store/service usage.
- [ ] Styling: Tailwind CSS.
- [ ] Testing: Jest or Vitest + DOM-based Testing Library, HTTP mocking: MSW
- [ ] Low-level component testing: A simple but interactive component must have a test suit with good test coverage. The component does not initiate HTTP requests.
- [ ] High-level component testing: The main component (it initiates HTTP requests) must have an example test to demonstrate a successful mocking of the HTTP calls.

## Documentation

I document the experience with the framework according to the following aspects.

- Learning curve: how easy to learn the framework. Tutorials, beginner documentation.
- Documentation: how up to date, how easy to find a solution for an everyday problem.
- Tooling: debugger, dev tools, VSCode support, scaffolding tools, linters etc.
- Framework features: impressions, and feelings about the logic, structure, building blocks, readability, and verbosity. Solutions for component properties, events, data handling etc. Hard to debug issues.
- Testing: how easy to set up the test framework for simpler and complex tests. Test writing patterns, readability, and verbosity. Hard to debug issues.

## Covered frameworks

- [x] React (partially)
- [x] Svelte
- [x] Angular
- [ ] Solid.js
- [ ] Vue.js
- [ ] Qwik
- [ ] Lit 
- [ ] Vanilla with web components

## Ideas to improve the feature set

- Client-side routing with route parameters and programmatic navigation
- Authentication
- Native CSS support
- CSS animations
- Fetch lib (SWR like)
- a11y
- i18n
- Dark mode

## Ideas for frameworks

- [ ] xhtml
- [ ] Vanilla with native DOM manipulation.
- [ ] Ember
- [ ] Preact
- [ ] Backbone.js
- [ ] JQuery
- [ ] Knockout 
- [ ] Alpine.js
