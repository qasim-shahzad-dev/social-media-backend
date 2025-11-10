/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { BaseError } from './BaseError';
import { ErrorHandler } from './errorHandler';
import { HTTP404Error } from './ApiError';
import { HttpStatus } from '../../constants/index';
import print from '../../logger/print';
import mongoose from 'mongoose';
import { redis } from '../../config/index';

/**
 * GlobalErrorHandler: Handles all errors across the application.
 * Provides a centralized approach to manage, log, and respond to errors.
 */
export class GlobalErrorHandler {
  private errorHandler: ErrorHandler;

  constructor() {
    this.errorHandler = new ErrorHandler();
  }

  /**
   * Middleware to handle application errors.
   * Logs the error and sends a secure response to the client.
   * @param error - The error object.
   * @param req - Express request object.
   * @param res - Express response object.
   * @param next - Express next function.
   */
  public middleware(error: BaseError, req: Request, res: Response, next: NextFunction): void {
    // Log and process only trusted errors
    if (!this.errorHandler.isTrustedError(error)) {
      next(error); // Pass to default error handler for unexpected issues
      // return;
    }

    // Handle and log the error
    this.errorHandler.handleError(error);

    // Respond securely to the client
    res.status(error.httpCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: true,
      name: error.name || 'InternalServerError',
      code: error.errorCode,
      status: error.httpCode || HttpStatus.INTERNAL_SERVER_ERROR,
      message: error.isOperational ? error.message : 'An unexpected error occurred. Please try again later.',
    });
  }
  public handleApiNotFound(req: Request, res: Response, next: NextFunction): void {
    const { t: translate } = req;
    const error = new HTTP404Error(translate('requested_path_not_found', { path: req.path }));
    next(error);
  }
  public handleUncaughtException(error: any): void {
    print('error', `uncaughtException : ${error}`);
    print('error', error?.stack || 'No stack trace available');
    mongoose.disconnect();
    redis.quit();
    process.exit(1);
  }
  public handleUnhandledRejection(error: any): void {
    print('error', `unhandledRejection : ${error}`);
    print('error', error?.stack || 'No stack trace available');
    mongoose.disconnect();
    redis.quit();
    process.exit(1);
  }
  public handleSIGINT(): void {
    print('info', 'SIGINT signal received. Shutting down server gracefully');
    mongoose.disconnect();
    redis.quit();
    // process.exit(1);
  }
}
const globalErrorHandler = new GlobalErrorHandler();
export default globalErrorHandler;
