import cn from "classnames";
import { FC, ReactNode } from "react";

import { OverlayWithLockedBody } from "components/overlay-with-locked-body/overlay-with-locked-body";
import { Portal } from "components/portal/portal";
import classes from "./modal.module.scss";

export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  contentClassname?: string;
  overlayClassname?: string;
  children?: ReactNode;
}

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  children,
  contentClassname,
  overlayClassname,
}) => {
  if (!open) {
    return null;
  }

  return (
    <Portal>
      <div className={classes["modal"]}>
        <OverlayWithLockedBody
          isOpened={open}
          onClick={onClose}
          className={cn(classes["overlay"], overlayClassname)}
        />
        <div className={cn(classes["modal__content"], contentClassname)}>
          {children}
        </div>
      </div>
    </Portal>
  );
};
