import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import {
  createProduct,
  getProductsList,
  initialStateProps,
  updateProduct,
} from "./products-slice";

export const addCaseGetProductsList = (
  builder: ActionReducerMapBuilder<initialStateProps>
) => {
  builder.addCase(getProductsList.pending, (state) => {
    state.isLoading = true;
    state.isMoreLoading = true;
  });

  builder.addCase(getProductsList.fulfilled, (state, { payload }) => {
    state.list = payload.results;
    state.pagination = {
      page: payload.page,
      totalPages: payload.total_pages,
      totalResults: payload.total_results,
    };
    state.isLoading = false;
    state.isMoreLoading = false;
    state.error = null;
  });

  builder.addCase(getProductsList.rejected, (state, { payload }) => {
    state.error = payload;
    state.isLoading = false;
    state.isMoreLoading = false;
  });
};

export const addCaseCreateProduct = (
  builder: ActionReducerMapBuilder<initialStateProps>
) => {
  builder.addCase(createProduct.pending, (state) => {
    state.isLoading = true;
    state.status = null;
  });

  builder.addCase(createProduct.fulfilled, (state) => {
    state.isLoading = false;
    state.status = "OK";
    state.error = null;
  });

  builder.addCase(createProduct.rejected, (state, { payload }) => {
    state.error = payload;
    state.isLoading = false;
  });
};

export const addCaseUpdateProduct = (
  builder: ActionReducerMapBuilder<initialStateProps>
) => {
  builder.addCase(updateProduct.pending, (state) => {
    state.isLoading = true;
    state.status = null;
  });

  builder.addCase(updateProduct.fulfilled, (state) => {
    state.isLoading = false;
    state.status = "OK";
    state.error = null;
  });

  builder.addCase(updateProduct.rejected, (state, { payload }) => {
    state.error = payload;
    state.isLoading = false;
  });
};
