export const ordersApi = {
  getOrders() {
    return "/v2/orders" as const;
  },
  getOrder(id: string) {
    return `/v2/orders/${id}` as const;
  },
};
