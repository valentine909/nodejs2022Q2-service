FROM node:lts-alpine as development

WORKDIR /app

COPY package*.json tsconfig.json tsconfig.build.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:lts-alpine as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json tsconfig.json tsconfig.build.json ./

COPY --from=development /app/package*.json ./

COPY --from=development /app/dist ./dist

COPY --from=development /app/doc ./doc

RUN npm install --omit=dev

CMD ["dist/main.js"]
