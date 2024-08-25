type Logger = {
  info: (message: string) => void
  warn: (message: string) => void
  error: (message: string) => void
}

type LoggerService = {
  info: (message: string) => void
  warn: (message: string) => void
  error: (message: string) => void
}

const makeLogger = (loggerService: LoggerService): Logger => {
  return {
    ...loggerService,
  }
}

export { makeLogger }
