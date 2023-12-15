export type LoggerOptions = {
  debug?: boolean;
  persist?: boolean;
};

export type Logger = {
  log(message: string): void;
  clearPersistedLogs(): void;
};

export function createLogger(options: LoggerOptions = {}) {
  function log(message: string) {
    // Send this to Sentry or Datadog
    debug(message);
    persist(message);
  }

  function clearPersistedLogs() {
    // Clear persisted logs from Async Storage
  }

  function debug(message: string) {
    if (!options.debug) return;
    console.info(message);
  }

  function persist(message: string) {
    if (!options.persist) return;
    // Persist message to Async Storage
  }

  return {
    log,
    clearPersistedLogs,
  };
}
