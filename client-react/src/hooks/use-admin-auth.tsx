import { useEffect, useState } from "react";

import { UserDto } from "api/dtos/user/user.dto";
import { selectUserState } from "store/user-slice/user-slice";
import { useAppSelector } from "./redux";

export const useAdminAuth = () => {
  const { user } = useAppSelector(selectUserState);
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  if (currentUser && user) {
    return;
  }
};
