import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import APIException from "../exceptions/api.exception";

type JoiError = { error: ValidationError };
function buildJoiResponse(error: JoiError) {
  return error.error.details.map((value) => {
    return {
      message: value.message,
      path: value.path,
    };
  });
}

export const errorHandler = (
  error: Error | APIException | any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let status = 500;
  let message = error.message;
  if (error instanceof APIException) {
    status = error.statusCode || status;
  }
  if (error.error && error.error.isJoi) {
    status = 400;
    message = buildJoiResponse(error);
  }
  response.status(status).send({ success: false, message: message });
};
