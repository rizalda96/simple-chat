import { BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";

export class DtoValidationError extends BadRequestException{
  validationErrors: ValidationError[];
  
  constructor(errors) {
    const result = errors.map((error) => Object.values(error.constraints)[0]);
    super(result);
  }
}