import winston from 'winston';
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // Save all logs to a file
    new winston.transports.File({ filename: 'notifications.log' }),
    // Also log errors to a separate file
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

export default logger;
