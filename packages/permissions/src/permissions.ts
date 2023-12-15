export type AvailablePermissions = typeof Permissions[keyof typeof Permissions];

export const Permissions = {
  CUSTOMERS_READ: "customers.read",
  CUSTOMERS_WRITE: "customers.write",
  ORGANIZATIONS_READ: "organizations.read",
  ORGANIZATIONS_WRITE: "organizations.write",
  PAYMENTS_READ: "payments.read",
  PAYMENTS_WRITE: "payments.write",
} as const;
