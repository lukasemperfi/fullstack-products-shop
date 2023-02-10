import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { SearchedProductsAndCategoriesDto } from "api/dtos/products/search/searched-products-and-categories.dto";
import { ErrorResponseDto } from "api/dtos/response/error-response.dto";
import { productsService } from "api/services/products/productsService";
import { RootReducers } from "../rootReducers";
import { RootState } from "../store";
import { addCaseGetProductsSearchData } from "./extra-reducers";

export interface initialStateProps {
  searchData: SearchedProductsAndCategoriesDto;
  error?: AxiosError<ErrorResponseDto> | null;
  isLoading: boolean;
}

const initialState: initialStateProps = {
  searchData: {
    products: [],
    categories: [],
  },
  error: null,
  isLoading: false,
};

export const getProductsSearchData = createAsyncThunk<
  SearchedProductsAndCategoriesDto,
  string,
  { rejectValue: AxiosError<ErrorResponseDto> }
>(
  `${RootReducers.productsCategoriesSearchData}/getProductsSearchData`,
  async (searchData, { rejectWithValue }) => {
    try {
      const response = await productsService.getProductsSearchData(searchData);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const productsCategoriesSearchData = createSlice({
  name: RootReducers.productsCategoriesSearchData,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addCaseGetProductsSearchData(builder);
  },
});

export const selectProductsCategoriesSearchDataState = (state: RootState) =>
  state?.productsCategoriesSearchData;

export const productsCategoriesSearchDataSlice =
  productsCategoriesSearchData.reducer;
