import { createEventEmitter, paymentsApi, ordersApi } from "@cross/core";

type ApplicationEvents = {
  "app:initialized": null;
  "app:destroyed": null;
};

const eventEmitter = createEventEmitter<ApplicationEvents>();

eventEmitter.on("app:initialized", () => {
  console.info("[web] Application is initialising...");
  console.info("==========================================");

  console.info("[web] Payments API URLs:");
  console.info(`[web] - ${paymentsApi.getPayments()}`);
  console.info(`[web] - ${paymentsApi.getPayment(":id")}`);

  console.info("[web] Orders API URLs:");
  console.info(`[web] - ${ordersApi.getOrders()}`);
  console.info(`[web] - ${ordersApi.getOrder(":id")}`);
});

eventEmitter.on("app:destroyed", () => {
  console.info("==========================================");
  console.info("[web] Application is being destroyed...");
});

eventEmitter.emit("app:initialized", null);
eventEmitter.emit("app:destroyed", null);
