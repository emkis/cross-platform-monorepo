export const paymentsApi = {
  getPayments() {
    return "/v2/payments" as const;
  },
  getPayment(id: string) {
    return `/v2/payments/${id}` as const;
  },
};
