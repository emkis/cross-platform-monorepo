import { paymentsApi } from "@cross/core";
import { Payment } from "@shared";

export function fetchAllPayments(): Payment[] {
  // This would call the `/v2/payments` URL (web).
  // Here we could call paymentsApi.getPayments() and parse its response.
  const _url = paymentsApi.getPayments();

  return [
    {
      id: "fhgs",
      amount: {
        value: 10,
        currency: "USD",
      },
    },
  ];
}
