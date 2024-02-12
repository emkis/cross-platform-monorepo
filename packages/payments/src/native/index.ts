import { paymentsApi, createLogger } from "@cross/core";
import type { Payment } from "@shared";

const logger = createLogger({ debug: true, preffix: "payments" });

export function fetchAllPayments(): Payment[] {
  logger.log("Fetching all payments...");

  // This would call the `/internal/v2/payments` URL (native).
  // Here we could call paymentsApi.getPayments() and parse its response.
  const _url = paymentsApi.getPayments();
  const response: Payment[] = [
    {
      id: "idj",
      amount: {
        value: 104.2,
        currency: "EUR",
      },
    },
  ];

  logger.log("All payments fetched!");
  return response;
}
