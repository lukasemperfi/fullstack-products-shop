import { useState, useEffect, MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ProductDto } from "api/dtos/products/product.dto";
import { REACTION_ACTION } from "api/dtos/products/reaction/types";
import { AuthPath } from "navigation/route-names";
import {
  createReaction,
  deleteReaction,
  updateReaction,
} from "store/reaction-slice/reaction-slice";
import { selectUserState } from "store/user-slice/user-slice";
import { useAppDispatch, useAppSelector } from "./redux";

export const useLikeDislike = (product: ProductDto | null) => {
  const [reaction, setReaction] = useState(product?.reaction);
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const { user, isAuth } = useAppSelector(selectUserState);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product?.reaction) {
      setReaction(product.reaction);
    }
  }, [product]);

  const handleLike = (event: MouseEvent<HTMLButtonElement>) => {
    if (!isAuth) {
      navigate(AuthPath.Login, { state: { backgroundLocation: location } });
    }

    if (!product || !user) {
      return;
    }

    if (reaction === REACTION_ACTION.like) {
      setReaction(0);
      setLike((prev) => prev - 1);
      dispatch(
        deleteReaction({
          product_id: product?.id,
          user_id: user?.id,
        })
      );
    }
    if (reaction === REACTION_ACTION.dislike) {
      setReaction(1);
      setLike((prev) => prev + 1);
      setDislike((prev) => prev - 1);
      dispatch(
        updateReaction({
          product_id: product?.id,
          user_id: user?.id,
          reaction_action: 1,
        })
      );
    }
    if (reaction === 0) {
      setReaction(1);
      setLike((prev) => prev + 1);
      dispatch(
        createReaction({
          product_id: product?.id,
          user_id: user?.id,
          reaction_action: 1,
        })
      );
    }
  };

  const handleDislike = () => {
    if (!isAuth) {
      navigate(AuthPath.Login, { state: { backgroundLocation: location } });
    }

    if (!product || !user) {
      return;
    }

    if (reaction === REACTION_ACTION.dislike) {
      setReaction(0);
      setDislike((prev) => prev - 1);
      dispatch(
        deleteReaction({
          product_id: product?.id,
          user_id: user?.id,
        })
      );
    }

    if (reaction === REACTION_ACTION.like) {
      setReaction(-1);
      setDislike((prev) => prev + 1);
      setLike((prev) => prev - 1);
      dispatch(
        updateReaction({
          product_id: product?.id,
          user_id: user?.id,
          reaction_action: -1,
        })
      );
    }

    if (reaction === 0) {
      setReaction(-1);
      setDislike((prev) => prev + 1);
      dispatch(
        createReaction({
          product_id: product?.id,
          user_id: user?.id,
          reaction_action: -1,
        })
      );
    }
  };

  const addOrRemoveLikeOrDislike = (
    counter: number,
    likeOrDislike?: number
  ) => {
    if (likeOrDislike === undefined) {
      return 0;
    }
    return likeOrDislike + counter;
  };

  return {
    handleLike,
    handleDislike,
    addOrRemoveLikeOrDislike,
    reaction,
    like,
    dislike,
  };
};
