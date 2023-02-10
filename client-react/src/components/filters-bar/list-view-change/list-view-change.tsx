import cn from "classnames";
import { FC } from "react";

import classes from "./list-view-change.module.scss";
import { ReactComponent as ViewChangeIcon } from "assets/view-change.svg";
import { ReactComponent as RectangleIcon } from "assets/rectangle.svg";
import { IconButton } from "components/icon-button/icon-button";

interface ListViewChangeProps {
  isViewChange: boolean;
  onViewChangeClick: () => void;
}

export const ListViewChange: FC<ListViewChangeProps> = ({
  isViewChange,
  onViewChangeClick,
}) => {
  return (
    <IconButton
      className={cn(classes["button"], classes["view-change"])}
      onClick={onViewChangeClick}
    >
      {isViewChange ? <RectangleIcon /> : <ViewChangeIcon />}
    </IconButton>
  );
};
