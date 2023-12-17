import { createLogger, createEventEmitter, paymentsApi, ordersApi } from "@cross/core";

type ApplicationEvents = {
  "app:initialized": null;
  "app:destroyed": null;
};

const logger = createLogger({ debug: true, persist: true, preffix: "native" });
const eventEmitter = createEventEmitter<ApplicationEvents>();

eventEmitter.on("app:initialized", () => {
  logger.log("Application is initialising...");
  logger.log("==========================================");

  logger.log("Payments API URLs:");
  logger.log(`- ${paymentsApi.getPayments()}`);
  logger.log(`- ${paymentsApi.getPayment(":id")}`);

  logger.log("Orders API URLs:");
  logger.log(`- ${ordersApi.getOrders()}`);
  logger.log(`- ${ordersApi.getOrder(":id")}`);
});

eventEmitter.on("app:destroyed", () => {
  logger.log("==========================================");
  logger.log("Application is being destroyed...");
});

eventEmitter.emit("app:initialized", null);
eventEmitter.emit("app:destroyed", null);
