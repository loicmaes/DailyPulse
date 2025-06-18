import { StatusCode } from "~/types/utils/http";

export class DailyException extends Error {
  code: number;

  constructor(code: number, message?: string) {
    super(message);
    this.code = code;
  }
}

export class BadRequestException extends DailyException {
  constructor(message?: string) {
    super(StatusCode.BAD_REQUEST, message);
  }
}

export class EntityNotFoundException extends DailyException {
  constructor(message?: string) {
    super(StatusCode.NOT_FOUND, message ?? "Entity not found!");
  }
}
