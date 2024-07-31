import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ImagePair } from "./image-pair.model";
import { Model } from "mongoose";

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(ImagePair.name) private readonly imagePairModel: Model<ImagePair>,
    @Inject("CLOUDINARY") private readonly cloudinary
  ) { }
  
  async uploadImagePair() {}
  
  async getImagePairs() {}
  
  async deleteImagePair() {}
}
