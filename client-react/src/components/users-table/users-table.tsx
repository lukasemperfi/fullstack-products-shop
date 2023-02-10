import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { memo, useEffect } from "react";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

import classes from "./users-table.module.scss";
import { useAppSelector, useAppDispatch } from "hooks/redux";
import { AdaptivImage } from "components/adaptiv-image/adaptiv-image";
import {
  deleteUser,
  forceUpdate,
  getUsers,
  selectUsersState,
} from "store/users-slice/users-slice";
import { DropdownCheckboxes } from "./dropdown-checkboxes";
import {
  getRoles,
  selectRoleState,
  updateRoles,
} from "store/roles-slice/roles-slice";

export const UsersTable = memo(() => {
  const { users, updateComponent } = useAppSelector(selectUsersState);
  const { roles } = useAppSelector(selectRoleState);
  const rolesMapped =
    roles &&
    roles.map((role) => ({
      id: String(role.id),
      name: role.role,
    }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getRoles());
  }, [updateComponent]);

  const handleDelete = async (user_id: number) => {
    await dispatch(deleteUser(user_id));
    dispatch(forceUpdate());
  };

  const handlSelectedCheckboxes = async (
    selectedCheckboxes: string[],
    user_id: number
  ) => {
    await dispatch(updateRoles({ roles: selectedCheckboxes, user_id }));
    dispatch(forceUpdate());
  };

  return (
    <div className={classes["container"]}>
      <Table className={classes["table"]}>
        <TableHead>
          <TableRow>
            <TableCell className={classes["table__header"]}>Name</TableCell>
            <TableCell className={classes["table__header"]}>Avatar</TableCell>
            <TableCell className={classes["table__header"]}>Role</TableCell>
            <TableCell className={classes["table__header"]}></TableCell>
            <TableCell className={classes["table__header"]}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes["table__body"]}>
          {!!users.length &&
            users.map((user) => (
              <TableRow key={user.id} className={classes["table__row"]}>
                <TableCell
                  className={cn(classes["table__cell"], classes["table__name"])}
                >
                  {`${user.first_name} ${user.last_name} `}
                </TableCell>
                <TableCell
                  className={cn(classes["table__cell"], classes["image"])}
                >
                  <AdaptivImage
                    src={user.avatar ? user.avatar : undefined}
                    imgContainerClassname={classes["image__container"]}
                    imgClassname={classes["image__img"]}
                  />
                </TableCell>
                <TableCell
                  className={cn(classes["table__cell"], classes["roles"])}
                >
                  <div className={cn(classes["roles__container"])}>
                    {!!user?.roles &&
                      user?.roles?.map((role) => (
                        <div key={role.id}>{role?.role}</div>
                      ))}
                  </div>
                </TableCell>
                <TableCell className={classes["table__cell"]}>
                  <DropdownCheckboxes
                    userId={user.id}
                    saveChanges={handlSelectedCheckboxes}
                    checkboxes={rolesMapped}
                    defaultValue={user.roles.map((role) => String(role.id))}
                  />
                </TableCell>
                <TableCell className={classes["table__cell"]}>
                  <Button
                    variant="contained"
                    className={classes["table__delete-button"]}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
});
