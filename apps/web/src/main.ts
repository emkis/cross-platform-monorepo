import { createLogger, createEventEmitter, paymentsApi } from "@cross/core";

type ApplicationEvents = {
  "app:initialized": null;
  "app:destroyed": null;
};

const logger = createLogger({ debug: true });
const eventEmitter = createEventEmitter<ApplicationEvents>();

eventEmitter.on("app:initialized", () => {
  logger.log("[web] Application is initialising...");
  logger.log("==========================================");
  logger.log("[web] Payment API URLs:");
  logger.log(`[web] - ${paymentsApi.getPayments()}`);
  logger.log(`[web] - ${paymentsApi.getPayment(":id")}`);
});

eventEmitter.on("app:destroyed", () => {
  logger.log("==========================================");
  logger.log("[web] Application is being destroyed...");
});

eventEmitter.emit("app:initialized", null);
eventEmitter.emit("app:destroyed", null);
