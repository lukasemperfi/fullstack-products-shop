import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ProductStatisticDto } from "api/dtos/products/statistic/statistic.dto";
import { ErrorResponseDto } from "api/dtos/response/error-response.dto";
import { productsService } from "api/services/products/productsService";
import { RootReducers } from "../rootReducers";
import { RootState } from "../store";

interface InitialStateProps {
  statistic: ProductStatisticDto | null;
  error?: AxiosError<ErrorResponseDto> | null;
  isLoading: boolean;
}

const initialState: InitialStateProps = {
  statistic: null,
  error: null,
  isLoading: false,
};

export const getProductStatistic = createAsyncThunk<
  ProductStatisticDto,
  void,
  { rejectValue: AxiosError<ErrorResponseDto> }
>(
  `${RootReducers.productStatistic}/getProductStatistic`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await productsService.getProductStatistic();

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const productStatistic = createSlice({
  name: RootReducers.productStatistic,
  initialState,
  reducers: {
    clearProduct(state) {
      state.statistic = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductStatistic.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProductStatistic.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.statistic = payload;
    });

    builder.addCase(getProductStatistic.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
  },
});

export const { clearProduct } = productStatistic.actions;

export const selectProductStatisticState = (state: RootState) =>
  state?.productStatistic;
export const selectProductsStatistic = (state: RootState) =>
  state?.productStatistic.statistic;

export const productStatisticSlice = productStatistic.reducer;
