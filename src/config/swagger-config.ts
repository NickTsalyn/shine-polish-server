import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("Shine&Polish API")
  .setDescription(
    "API documentation for [Shine&Polish](https://github.com/NickTsalyn/shine-polish) application. [Backend github repository](https://github.com/NickTsalyn/shine-polish-server)"
  )
  .addServer("https://shine-polish-server.onrender.com")
  .setVersion("1.1.1")
  .addBearerAuth(
    {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
    "accessToken"
  )
  .addTag("Authentication", "Authentication related endpoints")
  .addTag("Admin", "Admin related endpoints")
  .addTag("Bookings", "Bookings related endpoints")
  .addTag("Files", "Files related endpoints")
  .build();
