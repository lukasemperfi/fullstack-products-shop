import cn from "classnames";
import moment from "moment";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { CommentDto } from "api/dtos/products/comment/comment.dto";
import { Button } from "components/button/button";
import { Pagination } from "components/pagination/pagination";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  createComment,
  selectCommentsState,
} from "store/comment-slice/comment-slice";
import { selectUserState } from "store/user-slice/user-slice";
import { ProductComment } from "./comment/product-comment";
import { CommentsSort } from "./comments-sort";
import classes from "./product-comments.module.scss";

interface ProductCommentsProps {
  comments: CommentDto[];
}

export const ProductComments: FC<ProductCommentsProps> = ({ comments }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    pagination: { page: currentPage, totalPages, totalResults },
  } = useAppSelector(selectCommentsState);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { user, isAuth } = useAppSelector(selectUserState);
  const userName = user?.first_name;

  const isCurrUserNameEqualCommentName = (
    commentName: string,
    currUserName?: string
  ) => {
    return commentName === currUserName;
  };

  const getUserName = (commentName: string, currUserName?: string) => {
    const name = isCurrUserNameEqualCommentName(commentName, currUserName)
      ? "you"
      : commentName;

    return name;
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isAuth && user && id) {
      setError(false);
      dispatch(
        createComment({
          product_id: id,
          user_id: String(user?.id),
          text: newComment,
        })
      );
    } else {
      setError(true);
    }
  };

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    searchParams.set("page", String(value));
    setSearchParams(searchParams);
  };

  return (
    <div className={cn(classes["container"])}>
      <div className={cn(classes["sort"])}>
        <CommentsSort />
      </div>
      {comments?.map((comment) => (
        <ProductComment
          id={comment.id}
          avatar={comment.avatar}
          name={getUserName(comment.first_name, userName)}
          text={comment.text}
          date={moment(comment.created_at).format("MMMM Do YYYY, h:mm a")}
          key={comment.id}
          className={cn({
            [classes["active"]]: isCurrUserNameEqualCommentName(
              comment.first_name,
              userName
            ),
          })}
        />
      ))}
      <div className={classes["pagination"]}>
        <Pagination
          page={currentPage}
          onChange={handlePaginationChange}
          count={totalPages}
        />
      </div>
      <form className={classes["form"]} onSubmit={handleSubmit}>
        <label className={classes["label"]}>
          Create comment:
          <textarea
            name={"comment"}
            value={newComment}
            onChange={handleChange}
            className={classes["textarea"]}
            rows={15}
            cols={15}
          />
        </label>
        <div
          className={cn(classes["error"], {
            [classes["show"]]: error,
          })}
        >
          Add comments can only registered users
        </div>
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};
