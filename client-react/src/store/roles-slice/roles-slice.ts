import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ErrorResponseDto } from "api/dtos/response/error-response.dto";
import { RoleDto } from "api/dtos/user/role";
import { userService } from "api/services/user-service/user-service";
import { AppDispatch, RootState } from "store/store";
import { RootReducers } from "../rootReducers";

interface RolesState {
  roles: RoleDto[];
  error?: ErrorResponseDto | null;
  isLoading: boolean;
  updateComponent: number;
}

const initialState: RolesState = {
  roles: [],
  error: null,
  isLoading: false,
  updateComponent: 0,
};

export const getRoles = createAsyncThunk<
  RoleDto[],
  void,
  { rejectValue: AxiosError<ErrorResponseDto> }
>(`${RootReducers.user}/getRoles`, async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getRoles();

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const updateRoles = createAsyncThunk<
  void,
  { roles: string[]; user_id: number },
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(
  `${RootReducers.user}/updateRoles`,
  async ({ roles, user_id }, { rejectWithValue, dispatch }) => {
    try {
      await userService.updateRoles(roles, user_id);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const roles = createSlice({
  name: RootReducers.roles,
  initialState,
  reducers: {
    forceUpdate(state) {
      state.updateComponent++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoles.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getRoles.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.roles = payload;
    });

    builder.addCase(getRoles.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.response?.data;
    });

    builder.addCase(updateRoles.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateRoles.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(updateRoles.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.response?.data;
    });
  },
});
export const { forceUpdate } = roles.actions;
export const selectRoleState = (state: RootState) => state?.roles;
export const selectRoles = (state: RootState) => state?.roles.roles;

export const rolesSlice = roles.reducer;
