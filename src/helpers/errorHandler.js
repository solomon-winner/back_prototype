import ResponseHelper from "./responseHelper.js";
import { ValidationError } from "express-validation";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import { logger } from "./logger.js";

// const { NotFoundError, UnauthorizedError, ForbiddenError, BadRequestError } = pkg;
export const errorHandler = (err, req, res, next) => {
  if (err instanceof createError.NotFound) {
    return ResponseHelper.error(res, "Resource not found", [], 404);
  }

  if (err instanceof ValidationError) {
    return ResponseHelper.error(res, "Validation error", err.details, 422);
  }

  if (
    err instanceof createError.Unauthorized ||
    err instanceof createError.Forbidden
  ) {
    return ResponseHelper.error(res, "This action is Unauthorized", [], 403);
  }
  if (err instanceof createError.BadRequest) {
    return ResponseHelper.error(res, err.message, [], err.statusCode);
  }

  if (err instanceof jwt.TokenExpiredError) {
    return ResponseHelper.error(res, "Token is expired", [], 401);
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return ResponseHelper.error(res, "Token is invalid", [], 401);
  }

  if (err instanceof jwt.NotBeforeError) {
    return ResponseHelper.error(res, "Token is not active", [], 401);
  }

  // if (err instanceof QueryFailedError) {
  //     logger.error('QueryFailedError: ' + err.message);

  //     if (err.code === '23505') { // PostgreSQL unique violation error code
  //         return ResponseHelper.error(res, 'Duplicate entry', { error: err.detail }, 409);
  //     }

  //     return ResponseHelper.error(res, 'Database error', [], 500);
  // }

  logger.error(err.stack);

  if (process.env.NODE_ENV === "development") {
    return ResponseHelper.error(res, err.message, [], 500);
  }

  return ResponseHelper.error(res, "Internal server error", [], 500);
};
