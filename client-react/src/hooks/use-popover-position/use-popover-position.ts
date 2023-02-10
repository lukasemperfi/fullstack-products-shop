import { useLayoutEffect, useState } from "react";

import { PopoverPlacement } from "./popover-placement";
import { HTMLElementOrNull, PopoverPositionValue } from "./types";

export interface PopoverPositionProps {
  vertical: PopoverPositionValue;
  horizontal: PopoverPositionValue;
}

export const usePopoverPosition = (
  anchorEl: HTMLElementOrNull,
  popoverEl: HTMLElementOrNull,
  placement: PopoverPlacement
) => {
  const [popoverPosition, setPopoverPosition] = useState<PopoverPositionProps>({
    vertical: null,
    horizontal: null,
  });

  useLayoutEffect(() => {
    const handlePosition = () => {
      if (null !== anchorEl && null !== popoverEl) {
        const anchorElTop = anchorEl.getBoundingClientRect().top;
        const anchorElBottom = anchorEl.getBoundingClientRect().bottom;
        const anchorElLeft = anchorEl.getBoundingClientRect().left;
        const anchorElRight = anchorEl.getBoundingClientRect().right;

        const popoverElWidth = popoverEl.getBoundingClientRect().width;
        const popoverElHeight = popoverEl.getBoundingClientRect().height;

        const positions = {
          vertical: {
            top: anchorElTop - popoverElHeight,
            bottom: anchorElBottom,
          },
          horizontal: {
            left: anchorElLeft,
            right: anchorElRight - popoverElWidth,
          },
        };

        setPopoverPosition({
          vertical: positions.vertical[placement.vertical],
          horizontal: positions.horizontal[placement.horizontal],
        });
      }
    };

    handlePosition();

    window.addEventListener("resize", handlePosition);

    return () => window.removeEventListener("resize", handlePosition);
  }, [anchorEl, popoverEl, placement.horizontal, placement.vertical]);

  return popoverPosition;
};
