import { AccountSetting } from "components/account-setting/account-setting";
import { PageContainer } from "components/page-container/page-container";
import { useAppSelector } from "hooks/redux";
import { selectUserState } from "store/user-slice/user-slice";

export const UserPage = () => {
  const { user } = useAppSelector(selectUserState);
  return (
    <PageContainer>{user && <AccountSetting user={user} />}</PageContainer>
  );
};
