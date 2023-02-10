import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { CategoryDto } from "api/dtos/categories/category.dto";
import { GetTreeCategoryDto } from "api/dtos/categories/get-tree-category.dto";
import { CreateAttributeDto } from "api/dtos/products/attribute/create-attribute.dto";
import { ErrorResponseDto } from "api/dtos/response/error-response.dto";
import { categoriesService } from "api/services/categories/categoriesService";
import { RootReducers } from "../rootReducers";
import { AppDispatch } from "../store";
import {
  addCaseCreateCategory,
  addCaseDeleteCat,
  addCaseGetAttributesAndValues,
  addCaseGetList,
  addCaseGetTree,
  addCaseUpdateCategoryName,
} from "./extra-reducers";

type RenameCategory = { id: number; name: string };
type CreateCategory = { parent_id: number | null; name: string };

export interface InitialStateProps {
  list: CategoryDto[];
  tree: GetTreeCategoryDto[];
  attributesAndValues: CreateAttributeDto[];
  error?: AxiosError<ErrorResponseDto> | null;
  isLoading: boolean;
  isMoreLoading: boolean;
  status: string | null;
  updateComponent: number;
  pagination: {
    page: number | null;
    totalResults: number;
    totalPages: number;
    isListEnd: boolean;
    pageLimit: number;
    perPageLimit: number;
  };
}

const initialState: InitialStateProps = {
  list: [],
  tree: [],
  attributesAndValues: [],
  error: null,
  isLoading: false,
  isMoreLoading: false,
  status: null,
  updateComponent: 0,
  pagination: {
    page: null,
    totalResults: 0,
    totalPages: 0,
    isListEnd: false,
    pageLimit: 20,
    perPageLimit: 20,
  },
};

export const getList = createAsyncThunk<
  CategoryDto[],
  void,
  { rejectValue: AxiosError<ErrorResponseDto> }
>(`${RootReducers.categories}/getList`, async (_, { rejectWithValue }) => {
  try {
    const response = await categoriesService.getList();

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const getAttributesAndValues = createAsyncThunk<
  CreateAttributeDto[],
  { category_id: string | number },
  { rejectValue: AxiosError<ErrorResponseDto> }
>(
  `${RootReducers.categories}/getAttributesAndValues`,
  async ({ category_id }, { rejectWithValue }) => {
    try {
      const response = await categoriesService.getAttributesAndValues(
        category_id
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getTree = createAsyncThunk<
  GetTreeCategoryDto[],
  void,
  { rejectValue: AxiosError<ErrorResponseDto> }
>(`${RootReducers.categories}/getTree`, async (_, { rejectWithValue }) => {
  try {
    const response = await categoriesService.getTree();

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const createCategory = createAsyncThunk<
  void,
  CreateCategory,
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(
  `${RootReducers.categories}/createCategory`,
  async ({ parent_id, name }, { rejectWithValue, dispatch }) => {
    try {
      const response = await categoriesService.createCategory(parent_id, name);

      dispatch(create(response.data));
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateCategoryName = createAsyncThunk<
  void,
  RenameCategory,
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(
  `${RootReducers.categories}/updateCategoryName`,
  async ({ id, name }, { rejectWithValue, dispatch }) => {
    try {
      await categoriesService.updateCategoryName(id, name);
      dispatch(rename({ id, name }));
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCat = createAsyncThunk<
  void,
  number,
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(
  `${RootReducers.categories}/deleteCat`,
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await categoriesService.deleteCategory(id);
      dispatch(forceUpdate());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const categories = createSlice({
  name: RootReducers.categories,
  initialState,
  reducers: {
    setStatus(state) {
      state.status = null;
    },
    forceUpdate(state) {
      state.updateComponent++;
    },
    create(state, { payload: newCategory }: { payload: CategoryDto }) {
      const { list } = state;

      state.list = [...list, newCategory];
    },
    rename(state, { payload }: { payload: RenameCategory }) {
      const { id, name } = payload;
      const { list } = state;

      const existedObj = list.find((obj) => obj.id === id);
      if (existedObj) {
        existedObj.name = name;
      }
    },
    deleteCategory(state, { payload }: { payload: { id: number } }) {
      const { id } = payload;
      const { list } = state;

      state.list = list.filter((obj) => obj.id !== id);
    },
  },
  extraReducers: (builder) => {
    addCaseGetList(builder);
    addCaseUpdateCategoryName(builder);
    addCaseDeleteCat(builder);
    addCaseCreateCategory(builder);
    addCaseGetTree(builder);
    addCaseGetAttributesAndValues(builder);
  },
});

export const { setStatus, rename, deleteCategory, create, forceUpdate } =
  categories.actions;

export const categoriesSlice = categories.reducer;
