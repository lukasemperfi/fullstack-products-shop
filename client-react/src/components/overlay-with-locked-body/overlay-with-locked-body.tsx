import cn from "classnames";
import { ComponentPropsWithoutRef, FC } from "react";

import { useLockedBody } from "hooks/use-locked-body";
import classes from "./overlay-with-locked-body.module.scss";

interface OverlayWithLockedBodyProps extends ComponentPropsWithoutRef<"div"> {
  isOpened: boolean;
  onClick?: () => void;
  className?: string;
}

export const OverlayWithLockedBody: FC<OverlayWithLockedBodyProps> = ({
  isOpened,
  onClick,
  className,
}) => {
  useLockedBody(isOpened);

  if (!isOpened) {
    return null;
  }

  return (
    <div onClick={onClick} className={cn(classes["overlay"], className)} />
  );
};
