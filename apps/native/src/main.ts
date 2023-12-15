import { createLogger, createEventEmitter, paymentsApi } from "@cross/core";

type ApplicationEvents = {
  "app:initialized": null;
  "app:destroyed": null;
};

const logger = createLogger({ debug: true, persist: true });
const eventEmitter = createEventEmitter<ApplicationEvents>();

eventEmitter.on("app:initialized", () => {
  logger.log("[native] Application is initialising...");
  logger.log("==========================================");
  logger.log("[native] Payment API URLs:");
  logger.log(`[native] - ${paymentsApi.getPayments()}`);
  logger.log(`[native] - ${paymentsApi.getPayment(":id")}`);
});

eventEmitter.on("app:destroyed", () => {
  logger.log("==========================================");
  logger.log("[native] Application is being destroyed...");
});

eventEmitter.emit("app:initialized", null);
eventEmitter.emit("app:destroyed", null);
