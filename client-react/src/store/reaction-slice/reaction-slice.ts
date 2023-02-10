import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ErrorResponseDto } from "api/dtos/response/error-response.dto";
import { AppDispatch, RootState } from "store/store";
import { RootReducers } from "../rootReducers";
import { productsService } from "api/services/products/productsService";
import { ReactionAction } from "api/dtos/products/reaction/types";

interface ReactionState {
  error?: ErrorResponseDto | null;
  isLoading: boolean;
  updateComponent: number;
}

const initialState: ReactionState = {
  error: null,
  isLoading: false,
  updateComponent: 0,
};

export const createReaction = createAsyncThunk<
  void,
  { product_id: number; user_id: number; reaction_action: ReactionAction },
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(
  `${RootReducers.reaction}/createReaction`,
  async (
    { product_id, user_id, reaction_action },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await productsService.createReaction(
        product_id,
        user_id,
        reaction_action
      );
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateReaction = createAsyncThunk<
  void,
  { product_id: number; user_id: number; reaction_action: ReactionAction },
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(
  `${RootReducers.reaction}/updateReaction`,
  async (
    { product_id, user_id, reaction_action },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await productsService.updateReaction(
        product_id,
        user_id,
        reaction_action
      );
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteReaction = createAsyncThunk<
  void,
  { product_id: number; user_id: number },
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(
  `${RootReducers.reaction}/deleteReaction`,
  async ({ product_id, user_id }, { rejectWithValue }) => {
    try {
      await productsService.deleteReaction(product_id, user_id);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const reaction = createSlice({
  name: RootReducers.reaction,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createReaction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createReaction.fulfilled, (state, { payload }) => {
      state.isLoading = false;
    });

    builder.addCase(createReaction.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.response?.data;
    });
  },
});

export const selectReactionState = (state: RootState) => state?.reaction;

export const reactionSlice = reaction.reducer;
