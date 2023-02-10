import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ProductFiltersDto } from "api/dtos/filters/product-filters.dto";
import { GetProductsListDto } from "api/dtos/products/get-products-list.dto";
import { ProductDto } from "api/dtos/products/product.dto";
import { ErrorResponseDto } from "api/dtos/response/error-response.dto";
import { SuccessResponseDto } from "api/dtos/response/success-response.dto";
import { favoritesService } from "api/services/favorites/favorites-service";
import { RootState } from "store/store";
import { RootReducers } from "../rootReducers";

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

export const create = createAsyncThunk<
  SuccessResponseDto<null>,
  { user_id: string; product_id: string },
  { rejectValue: AxiosError<ErrorResponseDto> }
>(
  `${RootReducers.user}/create`,
  async ({ user_id, product_id }, { rejectWithValue }) => {
    try {
      const response = await favoritesService.create(user_id, product_id);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFavorite = createAsyncThunk<
  SuccessResponseDto<null>,
  { user_id: string; product_id: string },
  { rejectValue: AxiosError<ErrorResponseDto> }
>(
  `${RootReducers.user}/deleteFavorite`,
  async ({ user_id, product_id }, { rejectWithValue }) => {
    try {
      const response = await favoritesService.delete(user_id, product_id);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getFavoritesList = createAsyncThunk<
  GetProductsListDto,
  { filters?: ProductFiltersDto; user_id?: number },
  { rejectValue: AxiosError<ErrorResponseDto> }
>(
  `${RootReducers.products}/getFavoritesList`,
  async ({ filters, user_id }, { rejectWithValue }) => {
    try {
      const response = await favoritesService.getFilteredList(filters, user_id);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const favorites = createSlice({
  name: RootReducers.favorites,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(create.pending, (state) => {});

    builder.addCase(create.fulfilled, (state, { payload }) => {});

    builder.addCase(create.rejected, (state, { payload }) => {});

    builder.addCase(deleteFavorite.pending, (state) => {});

    builder.addCase(deleteFavorite.fulfilled, (state, { payload }) => {});

    builder.addCase(deleteFavorite.rejected, (state, { payload }) => {});

    builder.addCase(getFavoritesList.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getFavoritesList.fulfilled, (state, { payload }) => {
      state.list = payload.results;
      state.pagination = {
        page: payload.page,
        totalPages: payload.total_pages,
        totalResults: payload.total_results,
      };
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(getFavoritesList.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
      state.isMoreLoading = false;
    });
  },
});

export const selectFavoritesState = (state: RootState) => state?.favorites;

export const favoritesSlice = favorites.reducer;
