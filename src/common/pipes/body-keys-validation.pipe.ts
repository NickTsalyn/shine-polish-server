import {
  PipeTransform,
  Injectable,
  BadRequestException,
  Type,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";

@Injectable()
export class BodyKeysValidationPipe implements PipeTransform {
  constructor(private readonly dtoClass: Type<any>) {}

  transform(value: any) {
    const dtoInput = plainToInstance(this.dtoClass, value);
    const dtoInstance = plainToInstance(this.dtoClass, {});
    const allowedKeys = Object.keys(dtoInstance);
    const invalidKeys = Object.keys(dtoInput).filter((key) => !allowedKeys.includes(key));

    if (invalidKeys.length > 0) throw new BadRequestException(`Invalid keys provided: ${invalidKeys.join(", ")}`);

    return value;
  }
}
