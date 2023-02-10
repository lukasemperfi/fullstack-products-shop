import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import {
  createCategory,
  deleteCat,
  getAttributesAndValues,
  getList,
  getTree,
  InitialStateProps,
  updateCategoryName,
} from "./categories-slice";

export const addCaseGetList = (
  builder: ActionReducerMapBuilder<InitialStateProps>
) => {
  builder.addCase(getList.pending, (state) => {
    state.isLoading = true;
    state.isMoreLoading = true;
  });

  builder.addCase(getList.fulfilled, (state, { payload }) => {
    state.list = payload;
    state.isLoading = false;
    state.isMoreLoading = false;
    state.error = null;
  });

  builder.addCase(getList.rejected, (state, { payload }) => {
    state.error = payload;
    state.isLoading = false;
    state.isMoreLoading = false;
  });
};

export const addCaseGetAttributesAndValues = (
  builder: ActionReducerMapBuilder<InitialStateProps>
) => {
  builder.addCase(getAttributesAndValues.pending, (state) => {
    state.isLoading = true;
    state.isMoreLoading = true;
  });

  builder.addCase(getAttributesAndValues.fulfilled, (state, { payload }) => {
    state.attributesAndValues = payload;
    state.isLoading = false;
    state.isMoreLoading = false;
    state.error = null;
  });

  builder.addCase(getAttributesAndValues.rejected, (state, { payload }) => {
    state.error = payload;
    state.isLoading = false;
    state.isMoreLoading = false;
  });
};

export const addCaseGetTree = (
  builder: ActionReducerMapBuilder<InitialStateProps>
) => {
  builder.addCase(getTree.pending, (state) => {
    state.isLoading = true;
    state.isMoreLoading = true;
  });

  builder.addCase(getTree.fulfilled, (state, { payload }) => {
    state.tree = payload;
    state.isLoading = false;
    state.isMoreLoading = false;
    state.error = null;
  });

  builder.addCase(getTree.rejected, (state, { payload }) => {
    state.error = payload;
    state.isLoading = false;
    state.isMoreLoading = false;
  });
};

export const addCaseUpdateCategoryName = (
  builder: ActionReducerMapBuilder<InitialStateProps>
) => {
  builder.addCase(updateCategoryName.pending, (state) => {
    state.isLoading = true;
  });

  builder.addCase(updateCategoryName.fulfilled, (state) => {
    state.isLoading = false;
    state.error = null;
  });

  builder.addCase(updateCategoryName.rejected, (state, { payload }) => {
    state.error = payload;
    state.isLoading = false;
  });
};

export const addCaseDeleteCat = (
  builder: ActionReducerMapBuilder<InitialStateProps>
) => {
  builder.addCase(deleteCat.pending, (state) => {
    state.isLoading = true;
  });

  builder.addCase(deleteCat.fulfilled, (state) => {
    state.isLoading = false;
    state.error = null;
  });

  builder.addCase(deleteCat.rejected, (state, { payload }) => {
    state.error = payload;
    state.isLoading = false;
  });
};

export const addCaseCreateCategory = (
  builder: ActionReducerMapBuilder<InitialStateProps>
) => {
  builder.addCase(createCategory.pending, (state) => {
    state.isLoading = true;
  });

  builder.addCase(createCategory.fulfilled, (state) => {
    state.isLoading = false;
    state.error = null;
  });

  builder.addCase(createCategory.rejected, (state, { payload }) => {
    state.error = payload;
    state.isLoading = false;
  });
};
