import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("Shine&Polish API")
  .setDescription(
    "API documentation for Shine&Polish application. [Backend github repository](https://github.com/NickTsalyn/shine-polish-server)"
  )
  .addServer("http://localhost:8888")
  .setVersion("1.0.2")
  .addBearerAuth(
    {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
    "accessToken"
  )
  .addTag("Authentication", "Authentication related endpoints")
  .build();
