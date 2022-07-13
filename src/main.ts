import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { parse } from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 4000;
const swaggerDocs = {
  dir: 'doc',
  file: 'api.yaml',
};

async function createSwaggerDocument() {
  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(
    join(rootDirname, swaggerDocs.dir, swaggerDocs.file),
    'utf-8',
  );
  return parse(DOC_API);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup(swaggerDocs.dir, app, await createSwaggerDocument());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
