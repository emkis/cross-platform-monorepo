import type { AvailablePermissions } from './permissions';

export type CheckPermissions = (
  requiredPermissions: AvailablePermissions[],
  grantedPermissions: AvailablePermissions[],
) => boolean;

export const checkEveryPermission: CheckPermissions = (requiredPermissions, grantedPermissions) => {
  return requiredPermissions.every((permission) => grantedPermissions.includes(permission));
};

export const checkSomePermissions: CheckPermissions = (requiredPermissions, grantedPermissions) => {
  return requiredPermissions.some((permission) => grantedPermissions.includes(permission));
};
