import logger, { LogLevelDesc } from 'loglevel'

import packageJson from '../package.json'

export const config = {
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT,
  MODE: import.meta.env.MODE,
  API_URL: import.meta.env.VITE_API_URL,
  DEFAULT_PAGE_LIMIT: 15,
  LOG_LEVEL: (import.meta.env.VITE_LOG_LEVEL || 'trace') as LogLevelDesc,
  BUILD_VERSION: packageJson.version || import.meta.env.VITE_BUILD_VERSION,
} as const

logger.setLevel(config.LOG_LEVEL)
logger.info('config', config)
