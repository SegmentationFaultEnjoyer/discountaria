import log from 'loglevel'

import { config } from '@/config'

const createLogger = (name = 'app-logger', level = config.LOG_LEVEL) => {
  const logger = log.getLogger(name)

  logger.setLevel(level)

  return logger
}

export const logger = createLogger()
