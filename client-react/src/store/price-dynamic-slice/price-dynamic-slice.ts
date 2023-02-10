import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ErrorResponseDto } from "api/dtos/response/error-response.dto";
import { RootState } from "store/store";
import { RootReducers } from "../rootReducers";
import { PriceDynamicDto } from "api/dtos/products/price-dynamic/price-dynamic.dto";
import { productsService } from "api/services/products/productsService";

interface priceDynamicState {
  priceDynamic: PriceDynamicDto[];
  error?: ErrorResponseDto | null;
  isLoading: boolean;
}

const initialState: priceDynamicState = {
  priceDynamic: [],
  error: null,
  isLoading: false,
};

export const getPriceDynamicList = createAsyncThunk<
  PriceDynamicDto[],
  string,
  { rejectValue: AxiosError<ErrorResponseDto> }
>(
  `${RootReducers.priceDynamic}/getPriceDynamicList`,
  async (product_id, { rejectWithValue }) => {
    try {
      const response = await productsService.getPriceDynamicList(product_id);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const priceDynamic = createSlice({
  name: RootReducers.priceDynamic,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPriceDynamicList.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getPriceDynamicList.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.priceDynamic = payload;
    });

    builder.addCase(getPriceDynamicList.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.response?.data;
    });
  },
});

export const selectPriceDynamicState = (state: RootState) =>
  state?.priceDynamic;

export const priceDynamicSlice = priceDynamic.reducer;
