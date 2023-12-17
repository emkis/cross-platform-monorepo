import { createEventEmitter, paymentsApi } from "@cross/core";

type ApplicationEvents = {
  "app:initialized": null;
  "app:destroyed": null;
};

const eventEmitter = createEventEmitter<ApplicationEvents>();

eventEmitter.on("app:initialized", () => {
  console.info("[web] Application is initialising...");
  console.info("==========================================");
  console.info("[web] Payment API URLs:");
  console.info(`[web] - ${paymentsApi.getPayments()}`);
  console.info(`[web] - ${paymentsApi.getPayment(":id")}`);
});

eventEmitter.on("app:destroyed", () => {
  console.info("==========================================");
  console.info("[web] Application is being destroyed...");
});

eventEmitter.emit("app:initialized", null);
eventEmitter.emit("app:destroyed", null);
