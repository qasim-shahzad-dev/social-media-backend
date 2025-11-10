export abstract class BaseError extends Error {
  public readonly httpCode: number;
  public readonly isOperational: boolean;
  public readonly description: string;
  public readonly errorCode: string;

  constructor(name: string, httpCode: number, description: string, errorCode: string, isOperational: boolean) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.description = description;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
    // Error.captureStackTrace(this);
  }
}
