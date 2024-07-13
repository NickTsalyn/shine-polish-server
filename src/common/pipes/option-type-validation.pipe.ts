import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { OptionTypes } from "../enums";

@Injectable()
export class OptionTypeValidationPipe implements PipeTransform {
  readonly allowedTypes = Object.values(OptionTypes);

  transform(value: any) {
    value = value.toString();
    if (!this.isValidType(value)) throw new BadRequestException(`${value} is not a valid option type`);
    
    return value;
  }

  private isValidType(type: any) {
    return this.allowedTypes.includes(type);
  }
}
