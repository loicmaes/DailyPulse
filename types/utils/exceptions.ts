export class DailyException extends Error {
  code: number;

  constructor(code: number, message?: string) {
    super(message);
    this.code = code;
  }
}

export class EntityNotFoundException extends DailyException {
  constructor(message?: string) {
    super(404, message ?? "Entity not found!");
  }
}
