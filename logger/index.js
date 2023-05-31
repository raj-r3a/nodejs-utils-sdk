const {
  createLogger, format, transports, config,
} = require('winston');
const { LOG_LEVEL, LOG_EXIT_ON_ERROR, LOG_SILENT } = require('../config/constants');

const {
  colorize, combine, printf, splat,
} = format;

const myFormat = printf(({
  level, message, timestamp, ...meta
}) => {
  Object.keys(meta).forEach((key) => {
    if (meta[key] instanceof Error) {
      meta[key] = meta[key].stack;
    }
  });
  return `${timestamp} ${level}: ${message}, ${JSON.stringify(meta)}`;
});

/**
 * function logger(options) {
 *   @param {Object} options
  *  @returns {logger} logger
 }
 */
function getLogger(options) {
  const logger = createLogger({
    level: options.LOG_LEVEL || LOG_LEVEL,
    format: combine(
      colorize(),
      format.timestamp(),
      splat(),
      myFormat,
    ),
    exitOnError: options.LOG_EXIT_ON_ERROR || LOG_EXIT_ON_ERROR,
    silent: options.LOG_SILENT || LOG_SILENT,
    transports: [
      new transports.Console(),
      // new transports.File({ filename: 'combined.log' })
    ],
  });
  return logger;
}

module.exports = getLogger;
