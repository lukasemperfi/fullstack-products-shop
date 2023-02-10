import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import {
  getProductsSearchData,
  initialStateProps,
} from "./products-categories-search-data-slice";

export const addCaseGetProductsSearchData = (
  builder: ActionReducerMapBuilder<initialStateProps>
) => {
  builder.addCase(getProductsSearchData.pending, (state) => {
    state.isLoading = true;
  });

  builder.addCase(getProductsSearchData.fulfilled, (state, { payload }) => {
    state.searchData = payload;
    state.isLoading = false;
    state.error = null;
  });

  builder.addCase(getProductsSearchData.rejected, (state, { payload }) => {
    state.error = payload;
    state.isLoading = false;
  });
};
