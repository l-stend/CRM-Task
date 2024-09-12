# CRM-Task

Hey people, thanks a lot in advance for taking the time and review my implementation of the CRM challenge.
I had a lot of fun doing it, expecially for trying out technologies there were not really past of my usual Stack like PrimeVue and Tailwind. 
Given the scope of the project I decided to go with plain Vue insead of Nuxt, since most of its coolest feats were not going to be used anyway. Furthermore many of the libraries I needed, like pinia, prettier, vitest and cypress come out of the box with the `create vue` CLI command and that seved me lot of time integrating modules before diving in to the challenge.  

I hope you will enjoy reviewing my work and as for optimization, there is always something to improve, wich is why I would be very happy to discuss about it in person.

Here are some useful information about it and of course don't hesitate to contact me for any clarification.

## Tech Stack

The app was developed using the following technologies:

- [Vue.js](https://vuejs.org/)
- [pinia](https://pinia.vuejs.org/)
- [PrimeVue](https://primevue.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/docs/intro)
- [Vue I18n](https://vue-i18n.intlify.dev/)
- [Cypress](https://www.cypress.io/)
- [Vitest](https://vitest.dev/)
- [json-server](https://www.npmjs.com/package/json-server/v/0.17.4)

## Run locally

The app uses mock endpoints built with json-server and, in order to get content on its first render, it should be run first. To do so, navigate from the root to the `json-server` folder and run the following commands:

```bash
npm i
```

```bash
 json-server --watch db.json --port 3000 --middlewares ./json-server.js
```

Once the mock server is running, the app can be executed on the client side. After navigating to the `crm-task` folder, the following commands should be run in the terminal:

```bash
npm i
```

```bash
 npm run dev
```

The interface should now be rendered in the browser at the URL displayed in the terminal.

## Tests

Some end-to-end and unit tests are implemented using Cypress and Vitest where I focused on covering some of the main features while avoiding redundancy. The e2e specs cover the basic feats of the app and can be run from the `crm-task` folder using the scripts in `package.json`. The first script launches the Cypress interface to run the test suites from there, and the second performs the tests directly in the terminal. Please be sure to have the app up and runnig on the same URL from `cypress.config.ts`. 

```bash
npm run test:e2e:dev
```

```bash
"test:e2e"
```

Unit tests can be run using

```bash
npm run test:unit
```

The implementation includes a brief Vitest test spec that covers some of the features of the contacts store (`crm-task\src\stores\contactStore.ts`) which represents the core of the app's logic.  The same approach was followed for the Cypress specs.

## Deployment

A docker file can be found on `./crm-task/Dockerfile` and contains a little script to  build an image of the app and run it in a local container. In order to do so, the desktop version of Docker is required. 
The next possible steps would be to set a CI/CD pipeline wich is fired when pushing on the desired branch, or manually if preferred. Assuming the app would be deployed on cloud services, after possibly runnig the tests and some code quality tool check, the pipeline would push the built image to a container registry where it would normally be identified with the latest tag. 
