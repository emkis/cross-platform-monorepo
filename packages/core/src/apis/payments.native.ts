export const paymentsApi = {
  getPayments() {
    return "/internal/v2/payments" as const;
  },
  getPayment(id: string) {
    return `/internal/v2/payments/${id}` as const;
  },
};
