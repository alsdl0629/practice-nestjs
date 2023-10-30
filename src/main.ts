import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import * as path from "path";
import {ValidationPipe} from "@nestjs/common";

dotenv.config({
  path: path.resolve(
      (process.env.NODE_ENV === 'prod') ? '.prod.env'
          : (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.dev.env'
  )
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  await app.listen(3000);
}
bootstrap();
