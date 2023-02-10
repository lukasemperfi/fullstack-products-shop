import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ErrorResponseDto } from "api/dtos/response/error-response.dto";
import { AppDispatch, RootState } from "store/store";
import { RootReducers } from "../rootReducers";
import { productsService } from "api/services/products/productsService";
import { CommentDto } from "api/dtos/products/comment/comment.dto";
import { GetCommentsListDto } from "api/dtos/products/comment/get-comments-list.dto";

interface commentState {
  comments: CommentDto[];
  error?: ErrorResponseDto | null;
  isLoading: boolean;
  updateComponent: number;
  pagination: {
    page: number;
    totalResults: number;
    totalPages: number;
  };
}

const initialState: commentState = {
  comments: [],
  error: null,
  isLoading: false,
  updateComponent: 0,
  pagination: {
    page: 1,
    totalResults: 0,
    totalPages: 0,
  },
};

export const getCommentsList = createAsyncThunk<
  GetCommentsListDto,
  { product_id: string; sort?: string | null; page?: string | null },
  { rejectValue: AxiosError<ErrorResponseDto> }
>(
  `${RootReducers.comments}/getCommentsList`,
  async ({ product_id, sort, page }, { rejectWithValue }) => {
    try {
      const response = await productsService.getCommentsList(
        product_id,
        sort,
        page
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createComment = createAsyncThunk<
  void,
  { product_id: string; user_id: string; text: string },
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(
  `${RootReducers.comments}/createComment`,
  async ({ product_id, user_id, text }, { rejectWithValue, dispatch }) => {
    try {
      await productsService.createComment(product_id, user_id, text);
      dispatch(forceUpdate());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk<
  void,
  { product_id: string; commentId: number },
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(
  `${RootReducers.comments}/deleteComment`,
  async ({ product_id, commentId }, { rejectWithValue, dispatch }) => {
    try {
      await productsService.deleteComment(product_id, commentId);
      dispatch(forceUpdate());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const comments = createSlice({
  name: RootReducers.comments,
  initialState,
  reducers: {
    forceUpdate(state) {
      state.updateComponent++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentsList.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCommentsList.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.comments = payload.results;
      state.pagination = {
        page: payload.page,
        totalPages: payload.total_pages,
        totalResults: payload.total_results,
      };
    });

    builder.addCase(getCommentsList.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.response?.data;
    });

    builder.addCase(createComment.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createComment.fulfilled, (state, { payload }) => {
      state.isLoading = false;
    });

    builder.addCase(createComment.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.response?.data;
    });
  },
});
export const { forceUpdate } = comments.actions;

export const selectCommentsState = (state: RootState) => state?.comments;

export const commentSlice = comments.reducer;
