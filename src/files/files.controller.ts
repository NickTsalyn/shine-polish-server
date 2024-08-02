import { Controller, Get } from "@nestjs/common";
import { FilesService } from "./files.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppError } from "src/common/constants";
import { ImagePair } from "./image-pair.model";

@ApiTags("Files")
@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get("/images")
  @ApiOperation({ summary: "Get all image pairs [ ADMIN only ]" })
  @ApiResponse({ status: 200, type: [ImagePair] })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @ApiResponse({ status: 403, description: AppError.FORBIDDEN })
  @ApiResponse({ status: 404, description: AppError.IMAGE_PAIR_NOT_FOUND })
  getImagePairs() {
    return this.filesService.getImagePairs();
  }
}
