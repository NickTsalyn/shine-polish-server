import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const { PORT, MAIN_URL } = process.env;

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ["http://localhost:3000", MAIN_URL], // TODO: Remove localhost after deploy
    credentials: true,
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () =>
    console.log(`Server succesfully running on ${PORT} Port`)
  );
}

bootstrap();
