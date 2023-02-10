import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import {
  getProductFiltersData,
  initialStateProps,
} from "./products-filters-data.slice.";

export const addCaseGetProductFiltersData = (
  builder: ActionReducerMapBuilder<initialStateProps>
) => {
  builder.addCase(getProductFiltersData.pending, (state) => {
    state.isLoading = true;
  });

  builder.addCase(getProductFiltersData.fulfilled, (state, { payload }) => {
    state.filtersData = payload;
    state.isLoading = false;
    state.error = null;
  });

  builder.addCase(getProductFiltersData.rejected, (state, { payload }) => {
    state.error = payload;
    state.isLoading = false;
  });
};
