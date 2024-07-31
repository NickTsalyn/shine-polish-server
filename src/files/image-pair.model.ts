import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class ImagePair {
  @ApiProperty({ example: "5f9b5f5f9b5f9b5f9b5f9b5f", description: "MONGO ID" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @ApiProperty({ example: "https://before-image-url-example.com", description: "URL" })
  @Prop({ required: true })
  beforeIageURL: string;

  @ApiProperty({ example: "https://after-image-url-example.com", description: "URL" })
  @Prop({ required: true })
  afterImageURL: string;
}

export const ImagePairSchema = SchemaFactory.createForClass(ImagePair);
