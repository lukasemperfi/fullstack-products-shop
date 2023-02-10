import { FC } from "react";

import { Loader } from "components/loader/loader";
import { Modal, ModalProps } from "components/modal/modal";
import classes from "./modal-auth-form.module.scss";

export interface ModalAuthFormProps extends ModalProps {
  isLoading?: boolean;
}

export const ModalAuthForm: FC<ModalAuthFormProps> = ({
  open,
  children,
  onClose,
  isLoading,
}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        contentClassname={classes["content"]}
        overlayClassname={classes["overlay"]}
      >
        {children}
      </Modal>
      <Modal open={isLoading && open}>
        <Loader />
      </Modal>
    </>
  );
};
