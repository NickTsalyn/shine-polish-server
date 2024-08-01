import * as cloudinary from "cloudinary";
import { ConfigService } from "@nestjs/config";

export const cloudinaryConfig = (config: ConfigService) => {
  cloudinary.v2.config({
    cloud_name: config.get<string>("CLOUDINARY_CLOUD_NAME"),
    api_key: config.get<string>("CLOUDINARY_API_KEY"),
    api_secret: config.get<string>("CLOUDINARY_API_SECRET"),
  });
};
