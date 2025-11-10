import { Response } from 'express';
import { HttpStatus } from '../../constants/index';

/**
 * Class representing a standardized success response.
 */
export class SuccessResponse<T> {
  /**
   * Sucess true
   */
  public success: boolean;

  /**
   * HTTP status code of the response.
   */
  public status: number;

  /**
   * Message describing the response.
   */
  public message: string;

  /**
   * Result payload.
   */
  public results: T;

  /**
   * Initializes a new instance of the SuccessResponse class.
   * @param success - HTTP success.
   * @param status - HTTP status code.
   * @param message - Response message.
   * @param result - Data to be returned in the response.
   */
  constructor(status: number, message: string, results: T) {
    this.success = true;
    this.status = status;
    this.message = message;
    this.results = results;
  }
}

/**
 * Sends a standardized success response.
 * Ensures consistent structure and avoids unnecessary data exposure.
 * @param res - Express Response object.
 * @param result - The data to include in the response.
 * @param message - A custom success message.
 * @param status - The HTTP status code (default: HttpStatus.OK).
 */
export const sendResponse = <T>(res: Response, results: T, message = 'Operation successful', status = HttpStatus.OK): void => {
  // Construct and send the success response
  res.status(status).json(new SuccessResponse(status, message, results));
};
