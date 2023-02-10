import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ProductFiltersDataDto } from "api/dtos/products/filters-data/product-filters-data.dto";
import { ErrorResponseDto } from "api/dtos/response/error-response.dto";
import { productsService } from "api/services/products/productsService";
import { RootReducers } from "../rootReducers";
import { RootState } from "../store";
import { addCaseGetProductFiltersData } from "./extra-reducers";

export interface initialStateProps {
  filtersData: ProductFiltersDataDto;
  error?: AxiosError<ErrorResponseDto> | null;
  isLoading: boolean;
}

const initialState: initialStateProps = {
  filtersData: {
    price: {
      min: 0,
      max: 0,
    },
    attributes: [],
  },
  error: null,
  isLoading: false,
};

export const getProductFiltersData = createAsyncThunk<
  ProductFiltersDataDto,
  { search_query?: string; category_id?: string },
  { rejectValue: AxiosError<ErrorResponseDto> }
>(
  `${RootReducers.productsFiltersData}/getProductFiltersData`,
  async ({ category_id, search_query }, { rejectWithValue }) => {
    try {
      const response = await productsService.getFiltersData(
        search_query,
        category_id
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const productsFiltersData = createSlice({
  name: RootReducers.productsFiltersData,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addCaseGetProductFiltersData(builder);
  },
});

export const selectProductsFiltersDataState = (state: RootState) =>
  state?.productsFiltersData;

export const productsFiltersDataSlice = productsFiltersData.reducer;
