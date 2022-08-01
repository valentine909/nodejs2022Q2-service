# Home Library Service. Part II

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/valentine909/nodejs2022Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Running dockerized application

```
npm run docker-dev
```

After starting the app on port (5000 as default) you can open OpenAPI documentation
in your browser by typing http://localhost:5000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Applying migrations
Build the app:
```
npm run build
```
When docker container is running (see previous step), get the ID of api-dev:latest container:
```
docker ps
```
Open shell inside api-dev:latest container:
```
docker exec -it 484d8cd69a91 /bin/sh
```
NB! Insert your ID instead of 484d8cd69a91

Apply migration:
```
npm run migration:up
```
Exit from container's terminal:
```
exit
```

## Test docker image for vulnerability issues

```
npm run scan
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
