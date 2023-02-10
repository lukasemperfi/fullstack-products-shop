import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";

import { ProductFiltersDto } from "api/dtos/filters/product-filters.dto";
import { GetProductsListDto } from "api/dtos/products/get-products-list.dto";
import { ProductDto } from "api/dtos/products/product.dto";
import { ErrorResponseDto } from "api/dtos/response/error-response.dto";
import { SuccessResponseDto } from "api/dtos/response/success-response.dto";
import { productsService } from "api/services/products/productsService";
import { RootReducers } from "../rootReducers";
import { AppDispatch, RootState } from "../store";
import {
  addCaseCreateProduct,
  addCaseGetProductsList,
  addCaseUpdateProduct,
} from "./extra-reducers";

export interface initialStateProps {
  list: ProductDto[];
  error?: AxiosError<ErrorResponseDto> | null;
  isLoading: boolean;
  isMoreLoading: boolean;
  status: string | null;
  updateComponent: number;
  pagination: {
    page: number;
    totalResults: number;
    totalPages: number;
  };
}

const initialState: initialStateProps = {
  list: [],
  error: null,
  isLoading: false,
  isMoreLoading: false,
  status: null,
  updateComponent: 0,
  pagination: {
    page: 1,
    totalResults: 0,
    totalPages: 0,
  },
};

export const getProductsList = createAsyncThunk<
  GetProductsListDto,
  { filters?: ProductFiltersDto; user_id?: number },
  { rejectValue: AxiosError<ErrorResponseDto> }
>(
  `${RootReducers.products}/getProductsList`,
  async ({ filters, user_id }, { rejectWithValue }) => {
    try {
      const response = await productsService.getFilteredList(filters, user_id);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk<
  AxiosResponse<SuccessResponseDto<null>, any>,
  FormData,
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(
  `${RootReducers.categories}/createProduct`,
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await productsService.createProduct(formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk<
  AxiosResponse<SuccessResponseDto<null>, any>,
  { data: FormData; productId?: string },
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(
  `${RootReducers.categories}/updateProduct`,
  async ({ data, productId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await productsService.updateProduct(data, productId);
      return response;
    } catch (error: any) {

      return rejectWithValue(error);
    }
  }
);

export const createView = createAsyncThunk<
  void,
  number,
  { rejectValue: AxiosError<ErrorResponseDto> }
>(
  `${RootReducers.categories}/createView`,
  async (product_id, { rejectWithValue }) => {
    try {
      const response = await productsService.createView(product_id);
    } catch (error: any) {

      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk<
  void,
  number,
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(
  `${RootReducers.categories}/deleteProduct`,
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      await productsService.deleteProduct(productId);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const products = createSlice({
  name: RootReducers.products,
  initialState,
  reducers: {
    forceUpdate(state) {
      state.updateComponent++;
    },
  },
  extraReducers: (builder) => {
    addCaseGetProductsList(builder);
    addCaseCreateProduct(builder);
    addCaseUpdateProduct(builder);
  },
});

export const selectProductsState = (state: RootState) => state?.products;

export const selectProductsList = (state: RootState) => state?.products?.list;

export const { forceUpdate } = products.actions;

export const productsSlice = products.reducer;
