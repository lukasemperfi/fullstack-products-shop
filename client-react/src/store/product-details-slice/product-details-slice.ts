import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ProductDto } from "api/dtos/products/product.dto";
import { ErrorResponseDto } from "api/dtos/response/error-response.dto";
import { productsService } from "api/services/products/productsService";
import { RootReducers } from "../rootReducers";
import { RootState } from "../store";

interface initialStateProps {
  product: ProductDto | null;
  error?: AxiosError<ErrorResponseDto> | null;
  isLoading: boolean;
}

const initialState: initialStateProps = {
  product: null,
  error: null,
  isLoading: false,
};

export const getProductDetails = createAsyncThunk<
  ProductDto,
  { product_id: string; user_id?: number },
  { rejectValue: AxiosError<ErrorResponseDto> }
>(
  `${RootReducers.productDetails}/getProductDetails`,
  async ({ product_id, user_id }, { rejectWithValue }) => {
    try {
      const response = await productsService.getOneProduct(product_id, user_id);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const productDetails = createSlice({
  name: RootReducers.productDetails,
  initialState,
  reducers: {
    clearProduct(state) {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProductDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.product = payload;
    });

    builder.addCase(getProductDetails.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
  },
});

export const { clearProduct } = productDetails.actions;

export const selectProductDetailsState = (state: RootState) =>
  state?.productDetails;
export const selectProduct = (state: RootState) =>
  state?.productDetails.product;

export const productDetailsSlice = productDetails.reducer;
