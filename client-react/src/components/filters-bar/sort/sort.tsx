import React, { FC, memo, useRef, useState } from "react";
import cn from "classnames";

import { IconButton } from "components/icon-button/icon-button";
import { ReactComponent as SortIcon } from "assets/sort.svg";
import { ReactComponent as ArrowIcon } from "assets/arrow.svg";
import classes from "./sort.module.scss";
import { Popover } from "components/popover/popover";
import { PopoverPlacement } from "hooks/use-popover-position/popover-placement";

interface SortProps {
  className?: string;
}

export const Sort: FC<SortProps> = memo(({ className }) => {
  const [open, setOpen] = useState(false);
  const dropdownButtonRef = useRef(null);

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen((prevState) => !prevState);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dropdownPlacement: PopoverPlacement = {
    vertical: "bottom",
    horizontal: "right",
  };

  return (
    <>
      <IconButton
        ref={dropdownButtonRef}
        onClick={toggleDropdown}
        className={cn(classes["sort"], className)}
      >
        <SortIcon className={classes["sort__sort-icon"]} />
        <div>Price</div>
        <ArrowIcon className={classes["sort__arrow-icon"]} />
      </IconButton>
      <Popover
        anchorEl={dropdownButtonRef.current}
        isOpened={open}
        onClose={handleClose}
        placement={dropdownPlacement}
      >
        <div className={cn(classes["content"])}>
          <IconButton onClick={toggleDropdown} className={cn(classes["sort"])}>
            <div>Price</div>
            <ArrowIcon className={classes["sort__arrow-icon"]} />
          </IconButton>
          <IconButton onClick={toggleDropdown} className={cn(classes["sort"])}>
            <div>Price</div>
            <ArrowIcon className={classes["sort__arrow-icon"]} />
          </IconButton>
        </div>
      </Popover>
    </>
  );
});
