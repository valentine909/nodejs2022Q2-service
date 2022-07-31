# Home Library Service. Part I

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running dockerized application in development mode

```
npm run docker-dev
```

After starting the app on port (5000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:5000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running dockerized application in production mode

```
npm run docker-prod
```

After starting the app on port (5000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:5000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Test docker image for vulnerability issues

```
npm run scan
```

Only production image for api is going to be tested. Image must be previously
created by running dockerized application in production mode (see above) or by
running the following command:

```
npm run build-api-image
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
