import cn from "classnames";
import { FC } from "react";
import { useParams } from "react-router-dom";

import { AdaptivImage } from "components/adaptiv-image/adaptiv-image";
import { Button } from "components/button/button";
import { useAppDispatch } from "hooks/redux";
import { useHasRole } from "hooks/use-has-role";
import { deleteComment } from "store/comment-slice/comment-slice";
import classes from "./product-comment.module.scss";
import unknownUserIcon from "assets/unknown-user.png";

export interface ProductCommentProps {
  id: number;
  avatar: string | null;
  name: string;
  text: string;
  date: string;
  className?: string;
}

export const ProductComment: FC<ProductCommentProps> = ({
  id,
  avatar,
  name,
  text,
  date,
  className,
}) => {
  const dispatch = useAppDispatch();
  const { id: product_id } = useParams();
  const isAdmin = useHasRole(["admin"]);
  const avatarViewImage = avatar || unknownUserIcon;

  const deleteComm = () => {
    if (product_id) {
      dispatch(deleteComment({ product_id, commentId: id }));
    }
  };

  return (
    <div className={cn(classes["comment"], className)}>
      <div className={cn(classes["comment__user"], classes["user"])}>
        <div className={cn(classes["user__info"])}>
          <AdaptivImage
            imgContainerClassname={cn(classes["user__image-container"])}
            imgClassname={cn(classes["user__image"])}
            src={avatarViewImage}
          />
          <div className={cn(classes["user__name"])}>{name}</div>
        </div>
        <div className={cn(classes["user__comment-date"])}>{date}</div>
      </div>
      <div className={cn(classes["comment__text"])}>{text}</div>
      {isAdmin && (
        <Button
          onClick={deleteComm}
          className={cn(classes["comment__delete-btn"])}
        >
          Delete
        </Button>
      )}
    </div>
  );
};
