import { useNavigate } from "react-router-dom";

import { AdminPanelContent } from "components/admin-panel/admin-panel-content/admin-panel-content";
import { AdminPanelHeader } from "components/admin-panel/admin-panel-header/admin-panel-header";
import { PageContainer } from "components/page-container/page-container";
import classes from "./admin-users-page.module.scss";
import { AdminPanelPath } from "navigation/route-names";
import { UsersTable } from "components/users-table/users-table";

export const AdminUsersPage = () => {
  const navigate = useNavigate();

  const openAddNewForm = () => {
    navigate(AdminPanelPath.CreateProduct);
  };
  return (
    <PageContainer className={classes["container"]}>
      <AdminPanelHeader className={classes["header"]}>
        <h1>Users</h1>
      </AdminPanelHeader>
      <AdminPanelContent>
        <UsersTable />
      </AdminPanelContent>
    </PageContainer>
  );
};
