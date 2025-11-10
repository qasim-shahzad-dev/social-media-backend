//For Webhook
const WEBHOOK_TOKEN = "doOrDie";
const SECRET = "LIVE";
const MAX_TIME_DIFFERENCE = 60; // in seconds
export {
    WEBHOOK_TOKEN,
    SECRET,
    MAX_TIME_DIFFERENCE
}

//For Event 
export const USER_EVENTS ={ 
    CREATED:"user.created",
    DELETED:"user.deleted",
    LOGGED_IN:"user.LOGGED_IN"
}


export const HttpStatus = {
  // Informational responses
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,

  // Success responses
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // Redirection messages
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,

  // Client error responses
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  // Server error responses
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};
// constants/errorCodes.ts
export const ErrorCodes = {
  AUTH: {
    INVALID_TOKEN: 'AUTH_INVALID_TOKEN',
    UNAUTHORIZED: 'AUTH_UNAUTHORIZED',
    FORBIDDEN: 'AUTH_FORBIDDEN',
  },
  GENERIC: {
    NOT_FOUND: 'NOT_FOUND',
    DUPLICATE: 'DUPLICATE',
    VALIDATION_FAILED: 'VALIDATION_FAILED',
  },
  DATABASE: {
    CONNECTION_FAILED: 'DB_CONNECTION_FAILED',
    QUERY_ERROR: 'DB_QUERY_ERROR',
  },
  SERVER: {
    INTERNAL_ERROR: 'SERVER_INTERNAL_ERROR',
    NOT_IMPLEMENTED: 'SERVER_NOT_IMPLEMENTED',
  },
};
// constants/errorNames.ts
export const ErrorNames = {
  AUTH: {
    INVALID_TOKEN: 'InvalidTokenError',
    UNAUTHORIZED: 'UnauthorizedError',
    FORBIDDEN: 'ForbiddenError',
  },
  GENERIC: {
    NOT_FOUND: 'NotFoundError',
    DUPLICATE: 'DuplicateError',
    VALIDATION_FAILED: 'ValidationError',
  },
  DATABASE: {
    CONNECTION_FAILED: 'DatabaseConnectionError',
    QUERY_ERROR: 'DatabaseQueryError',
  },
  SERVER: {
    INTERNAL_ERROR: 'InternalServerError',
    NOT_IMPLEMENTED: 'NotImplementedError',
  },
};
export type RoleBelongsToTypeValues = 'admin';
export enum DocumentType {
  CitizenshipId = 'cc', // Citizenship ID
  Passport = 'ps', // Passport
  ForeignerIdCard = 'ce', // Foreigner ID card
  TaxpayerId = 'nit', // Taxpayer ID
}


export const QueueNames = Object.freeze({
  trellixReportQueue: 'trellixReportQueue'
});


export enum RedisExpireTime {
  '30S' = 30,
  '1M' = 60,
  '2M' = 2 * 60,
  '3M' = 3 * 60, // 3 MINUTES
  '5M' = 5 * 60,
  '10M' = 10 * 60,
  '15M' = 15 * 60,
  '30M' = 30 * 60,
  '1H' = 60 * 60,
}
 export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;