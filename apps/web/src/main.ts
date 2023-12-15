import { createLogger, createEventEmitter } from "@cross/core";

type ApplicationEvents = {
  "app:initialized": { message: string };
  "app:destroyed": { message: string };
};

const logger = createLogger({ debug: true });
const eventEmitter = createEventEmitter<ApplicationEvents>();

eventEmitter.on("app:initialized", ({ message }) => {
  logger.log(`[web] ${message}`);
  logger.log("[web] Application was initialized!");
});

eventEmitter.on("app:destroyed", ({ message }) => {
  logger.log(`[web] ${message}`);
  logger.log("[web] Application was destroyed!");
});

eventEmitter.emit("app:initialized", { message: "Waking up..." });
eventEmitter.emit("app:destroyed", { message: "Going to seep..." });
