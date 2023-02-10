import {
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from "react";

import { PopoverPlacement } from "hooks/use-popover-position/popover-placement";
import { usePopoverPosition } from "hooks/use-popover-position/use-popover-position";
import classes from "./popover.module.scss";
import { Portal } from "../portal/portal";
import { useOutsideClick } from "hooks/use-outside-click";

export interface PopoverProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  isOpened: boolean;
  placement: PopoverPlacement;
  refContent?: RefObject<HTMLElement>;
  posDisplacement?: { top: number; left: number };
}

export const Popover: FC<PopoverProps> = ({
  children,
  anchorEl,
  onClose,
  isOpened,
  placement,
  refContent,
  posDisplacement = { top: 0, left: 0 },
}) => {
  const [popoverRef, setPopoverRef] = useState<HTMLElement | null>(null);
  const popoverPosition = usePopoverPosition(anchorEl, popoverRef, placement);
  const [position, setPosition] = useState({
    top: `${popoverPosition.vertical}px`,
    left: `${popoverPosition.horizontal}px`,
  });

  useEffect(() => {
    setPosition({
      top: `${
        popoverPosition.vertical &&
        popoverPosition.vertical + posDisplacement.top
      }px`,
      left: `${
        popoverPosition.horizontal &&
        popoverPosition.horizontal + posDisplacement.left
      }px`,
    });
  }, [popoverPosition]);

  useOutsideClick(anchorEl, onClose);

  if (!isOpened) {
    return null;
  }

  return (
    <Portal>
      <div
        ref={setPopoverRef}
        className={classes["popoverContent"]}
        style={position}
      >
        {children}
      </div>
    </Portal>
  );
};
