export type LoggerOptions = {
  debug?: boolean;
};

export type Logger = {
  log(message: string): void;
};

export function createLogger(options: LoggerOptions = {}) {
  const { debug: isDebugEnabled } = options;

  function log(message: string) {
    // Send this to Sentry or Datadog
    debug(message);
  }

  function debug(message: string) {
    if (!isDebugEnabled) return;
    console.info(message);
  }

  return { log };
}
