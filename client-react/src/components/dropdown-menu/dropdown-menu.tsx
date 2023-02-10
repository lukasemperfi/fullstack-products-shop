import cn from "classnames";

import classes from "./dropdown-menu.module.scss";
import { Popover, PopoverProps } from "components/popover/popover";

interface DropdownMenuProps extends PopoverProps {
  containerClasses?: string;
}

export const DropDownMenu = ({
  anchorEl,
  onClose,
  isOpened,
  placement,
  onClick,
  children,
  refContent,
  containerClasses,
  posDisplacement,
}: DropdownMenuProps) => {
  if (!isOpened) {
    return null;
  }

  return (
    <Popover
      anchorEl={anchorEl}
      onClose={onClose}
      isOpened={isOpened}
      placement={placement}
      posDisplacement={posDisplacement}
    >
      <div className={cn(classes["dropdowMenu"], containerClasses)}>
        {children}
      </div>
    </Popover>
  );
};
