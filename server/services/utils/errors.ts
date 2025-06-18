import type { DailyException } from "~/types/utils/exceptions";
import type { HttpEvent, StatusCode } from "~/types/utils/http";

export function handleException(event: HttpEvent, exception: DailyException) {
  setOutput(event, exception.code, exception.message);

  return {
    code: exception.code,
    message: exception.message,
  };
}

export function setOutput(event: HttpEvent, code: StatusCode, message: string) {
  event.node.res.statusCode = code;
  event.node.res.statusMessage = message;
}
