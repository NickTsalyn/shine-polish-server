import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { swaggerConfig } from "./config";

async function bootstrap() {
  const { PORT, MAIN_URL } = process.env;

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:3001", MAIN_URL], // TODO: Remove localhost after deploy
    credentials: true,
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(PORT, () =>
    console.log(`Server succesfully running on ${PORT} Port`)
  );
}

bootstrap();
