import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { ErrorResponseDto } from "api/dtos/response/error-response.dto";
import { UserDto } from "api/dtos/user/user.dto";
import { userService } from "api/services/user-service/user-service";
import { AppDispatch, RootState } from "store/store";
import { RootReducers } from "../rootReducers";

interface userAuthState {
  users: UserDto[];
  isAuth: boolean;
  error?: ErrorResponseDto | null;
  isLoading: boolean;
  updateComponent: number;
}

const initialState: userAuthState = {
  users: [],
  isAuth: false,
  error: null,
  isLoading: false,
  updateComponent: 0,
};

export const getUsers = createAsyncThunk<
  UserDto[],
  void,
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(`${RootReducers.user}/getUsers`, async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await userService.getUsers();

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const deleteUser = createAsyncThunk<
  void,
  number,
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(
  `${RootReducers.user}/deleteUser`,
  async (user_id, { rejectWithValue, dispatch }) => {
    try {
      await userService.deleteUser(user_id);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const users = createSlice({
  name: RootReducers.users,
  initialState,
  reducers: {
    forceUpdate(state) {
      state.updateComponent++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.users = payload;
    });

    builder.addCase(getUsers.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.response?.data;
    });
  },
});
export const { forceUpdate } = users.actions;
export const selectUsersState = (state: RootState) => state?.users;
export const selectUsers = (state: RootState) => state?.users.users;

export const usersSlice = users.reducer;
