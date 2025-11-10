import { BaseError } from './BaseError';
import logger from '../../logger/index';

/**
 * ErrorHandler: Centralized error handling system.
 */
export class ErrorHandler {
  /**
   * Logs and processes application-level errors.
   * @param error - The error to be handled.
   */
  public async handleError(error: BaseError) {
    logger.error('error', {
      name: error.name,
      message: error.message,
      httpCode: error.httpCode,
      stack: error.stack,
    });
  }

  /**
   * Determines if an error is trusted (operational) or not.
   * @param error - The error to check.
   * @returns True if the error is trusted, false otherwise.
   */
  public isTrustedError(error: unknown): boolean {
    return error instanceof BaseError && error.isOperational;
  }
}

export const errorHandler = new ErrorHandler();
