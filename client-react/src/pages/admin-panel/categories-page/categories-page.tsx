import { PageContainer } from "components/page-container/page-container";
import classes from "./categories-page.module.scss";
import { CategoriesTable } from "components/categories/categories-table/categories-table";
import { CreateCategories } from "components/categories/create-categories/create-categories";
import { AdminPanelHeader } from "components/admin-panel/admin-panel-header/admin-panel-header";
import { AdminPanelContent } from "components/admin-panel/admin-panel-content/admin-panel-content";

export const CategoriesPage = () => {
  return (
    <PageContainer className={classes["container"]}>
      <AdminPanelHeader className={classes["header"]}>
        <CreateCategories />
      </AdminPanelHeader>
      <AdminPanelContent>
        <CategoriesTable />
      </AdminPanelContent>
    </PageContainer>
  );
};
