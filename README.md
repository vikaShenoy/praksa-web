# Praksa

Praksa is a web application for music practice.

### Tech

- [Next.js](https://nextjs.org/), [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
- [Styled-components](https://styled-components.com/)
- [jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Getting Started

1. Install the correct nodejs version (16.17.0). We reccommend using [ASDF](https://asdf-vm.com/) to manage tool versions.
2. `yarn install` to install dependencies.

### Development

Run the development server with the following command. The app will be served at `localhost:3000`, and will hot reload as you make changes.
  ```bash
 yarn dev
 ```

### Testing

To run tests:

 ```bash
 yarn test
 ```

### CI / CD

#### CI
CI is managed using GitHub actions. Linting and tests are run on every push. The pipeline can be seen in .github/test.yml.

#### CD
The app is deployed on Vercel. To deploy, simply merge a pull request into the main branch. Make sure CI checks are passing before merging a pull request.
