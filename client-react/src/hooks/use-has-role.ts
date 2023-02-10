import { selectUserState } from "store/user-slice/user-slice";
import { useAppSelector } from "./redux";

export const useHasRole = (allowRoles: string[]) => {
  const { user } = useAppSelector(selectUserState);
  const rolesStringArr = user?.roles.map((role) => role.role);
  const hasRole = rolesStringArr?.some((role) => allowRoles.includes(role));

  return hasRole;
};
