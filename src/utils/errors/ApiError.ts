import{ BaseError } from './BaseError';
import { HttpStatus, ErrorCodes, ErrorNames } from '../../constants/index';

export class ApiError extends BaseError {
  constructor(
    name: string,
    httpCode = HttpStatus.BAD_REQUEST,
    description = '',
    errorCode = 'API_ERROR',
    isOperational = true
  ) {
    super(name, httpCode, description, errorCode, isOperational);
  }
}

export class ValidationError extends BaseError {
  constructor(description = 'Baq Request') {
    super(
      ErrorNames.GENERIC.VALIDATION_FAILED,
      HttpStatus.BAD_REQUEST,
      description,
      ErrorCodes.GENERIC.VALIDATION_FAILED,
      true
    );
  }
}

export class HTTP404Error extends BaseError {
  constructor(description = 'Not Found') {
    super(
      ErrorNames.GENERIC.NOT_FOUND,
      HttpStatus.NOT_FOUND,
      description,
      ErrorCodes.GENERIC.NOT_FOUND,
      true
    );
  }
}

export class HTTP500Error extends BaseError {
  constructor(description = 'Internal Server Error') {
    super(
      ErrorNames.SERVER.INTERNAL_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
      description,
      ErrorCodes.SERVER.INTERNAL_ERROR,
      true
    );
  }
}
