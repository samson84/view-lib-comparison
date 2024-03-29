# Angular TODO App

- [x] REST HTTP communication: The client must read, update, delete and create a Todo.
- [x] Parent-Child component communication.
- [x] Shared data store/service usage.
- [x] Styling: Tailwind CSS.
- [x] Testing: Jest or Vitest + DOM-based Testing Library, HTTP mocking: MSW
- [x] Low-level component testing: A simple but interactive component must have a test suit with good test coverage. The component does not initiate HTTP requests.
- [x] High-level component testing: The main component (it initiates HTTP requests) must have an example test to demonstrate a successful mocking of the HTTP calls.

## Experience

### Documentation

- The new https://anguler.dev looks fancy, but it has a lot of errors, and sometimes the examples are not working.

- The jump into coding approach looks handy. It is easy to try out the basic features of Angular and get familiar with the syntax.

- It is sad, that the complex tutorial can be started in a browser, but the latter features are not implemented in it.

- https://angular.dev misses how to install and start an Angular application. It is only described in https://angular.io. (The tutorial covers this step, but if I want to start quickly an Angular application, I get stuck the first time).

- The documentation looks comprehensive, especially on https://angular.io. The API documentation is obfuscated on https://angular.dev. I  missed the examples.

- The Proxy config is outdated on anglar.io and does not exist on https://angular.dev.

### Tooling

- The angular CLI's generate command looks handy to quickly scaffold components, but it is sometimes not fit to your project.

- angular.json looks complex at first sight.

- Typescript support by default looks pretty nice.

- Unfortunately, the default Angular App (generated by ng new) contains moderate npm vulnerabilities.

- I got nice type-checking in the templates with the Angular Language Server VSCode extension.

- The Tailwind install was seamless.

## Testing

- Angular's default testing library is Karma. I wanted to use the Testing Library for Angular with jest-dom, so first I needed to reconfigure the default project to Jest.

- The Angular docs did not give me any advice on the migration, I found it in the Jest documentation. It also refers to 3rd party 
unofficial preset from 2019. https://www.xfive.co/blog/testing-angular-faster-jest/.

- Jest and testing library configuration was relatively seamless.

- First, it looked difficult to use async-await syntax according to the documentation, but was worked perfectly with the Jest + testing library. 

- It was really easy to mock the standalone components inputs and outputs with the testing library. The final test code was readable and easy to understand.

- I tried to create integration tests with [MSW](https://mswjs.io/) integration. It was a little bit sucks in Jest because Jest does not enable node.js in the test environment, but MSW uses the Node.js's builtins. The error messages were not trivial, I created [a polyfill setup script](https://mswjs.io/docs/migrations/1.x-to-2.x#requestresponsetextencoder-is-not-defined-jest) to solve the issue.  I had to resolve another issue related to the [JSDOM's enforced browser export condition issue](https://mswjs.io/docs/migrations/1.x-to-2.x#cannot-find-module-mswnode-jsdom). 

- I also run into troubles with integration tests on how to provide the HTTP client to the component. For me Angular's DI system is 
not clear in every detail, so I try to find some usage examples. It was figured out that it is enough to use the testing library's render option's `imports` param instead of `componentProviders`.

- I had to resolve the same issue in Sevlte here with the HTTP base URL. The browser adds the current URL scheme and domain to the fetch's URL but this behavior does not exist in Node/Jest/JSDOM. So I used a configuration service to set up a base URL and then I mocked it in the tests.

### Framework

- The structural directives like ngIf, ngFor etc look the pain in the ass from a readability point of view. The template built-in control flow blocks a much nicer alternative. Unfortunately, they are in development preview still.

- An Angular component has a lot of boilerplate. According to the style guide it needs at least 3 files. Business logic, template file and styles. If I want to use a component, I have to import it into the ts file, I have to add it to the decorator and finally use its selector in the template.

- The angular style guide recommends a lot of naming conventions to easily identify a lot of elements.

- The service/component separation is a good practice which is supported by default.

- Angular has a lot of concepts: components, services, and directives (3 types), 2 types of module usage (standalone, ngModules), 2 types of templating (ng* directives + built-in control flows), and signals. At first sight, it is too much and creates a too complex system altogether. 

- Angular is moving from one direction to another and the current framework is in between. The new concepts look promising (built-in directives, signals, standalone components).

- It is easy to mess up the code with the directives, especially the structural directives. Importing a directive to a module adds some implicit functionalities to the components, they are sometimes documented poorly and the official API documentation is hard to read.

- The HTTP module with rxJS observables provides a nice and easy way to change the component props according to the HTTP response. Handy error handling, types built in.

- The Angular's component update logic is hard to follow. It uses zone.js. This script is monkey-patch the JS built-in features like
setTimeout. It uses complex logic to find which components need an update. The developer can manually fine-tune this logic with an obfuscated method at first look (NgZone, OnPush). Signals look like a solution for this, but it is in the developer preview.

## Bottom line

- Angular is a complex system with a lot of built-in functionality and requires a lot of boilerplate code. Angular handles its complexity by tooling (`ng generate`). 

- For me, it is more favorable when a framework tries to create simple concepts and lets the developer decide about the structure, component size and architecture.

- Managing the component size and complexity, and extracting logic to child components is better for me than separating the component into multiple files and approaching the readability.
