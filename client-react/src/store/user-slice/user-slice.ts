import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { AuthResponse } from "api/dtos/response/auth-response";
import { ErrorResponseDto } from "api/dtos/response/error-response.dto";
import { CreateUserDto } from "api/dtos/user/create-user.dto copy";
import { UserDto } from "api/dtos/user/user.dto";
import { AuthPath } from "api/services/auth/auth-path";
import { authService } from "api/services/auth/auth-service";
import { userService } from "api/services/user-service/user-service";
import { AppDispatch, RootState } from "store/store";
import { RootReducers } from "../rootReducers";

interface userAuthState {
  user: UserDto | null;
  isAuth: boolean;
  error?: ErrorResponseDto | null;
  isLoading: boolean;
  refreshToken: string | null;
  userUpdated: number;
}

const initialState: userAuthState = {
  user: null,
  isAuth: false,
  error: null,
  isLoading: false,
  refreshToken: null,
  userUpdated: 0,
};

export const login = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: AxiosError<ErrorResponseDto> }
>(
  `${RootReducers.user}/login`,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const registration = createAsyncThunk<
  AuthResponse,
  CreateUserDto,
  { rejectValue: AxiosError<ErrorResponseDto> }
>(`${RootReducers.user}/registration`, async (newUser, { rejectWithValue }) => {
  try {
    const response = await authService.registration(newUser);

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const updateUser = createAsyncThunk<
  void,
  { newUser: FormData; user_id: number },
  { rejectValue: AxiosError<ErrorResponseDto>; dispatch: AppDispatch }
>(
  `${RootReducers.user}/updateUser`,
  async ({ newUser, user_id }, { rejectWithValue, dispatch }) => {
    try {
      await userService.updateUser(newUser, user_id);
      dispatch(forceUpdate());
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: AxiosError<ErrorResponseDto> }
>(`${RootReducers.user}/logout`, async (_, { rejectWithValue }) => {
  try {
    const response = await authService.logout();
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const checkAuth = createAsyncThunk<
  AuthResponse,
  void,
  { rejectValue: AxiosError<ErrorResponseDto> }
>(`${RootReducers.user}/checkAuth`, async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BASE_URL + AuthPath.refresh,
      {
        withCredentials: true,
      }
    );

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

const user = createSlice({
  name: RootReducers.user,
  initialState,
  reducers: {
    forceUpdate(state) {
      state.userUpdated++;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = payload.user;
      localStorage.setItem("token", payload.accessToken);
    });

    builder.addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.response?.data;
    });

    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(registration.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = payload.user;
      localStorage.setItem("token", payload.accessToken);
    });

    builder.addCase(registration.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.response?.data;
    });

    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("token");
    });

    builder.addCase(logout.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.response?.data;
    });

    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = payload.user;
      localStorage.setItem("token", payload.accessToken);
    });

    builder.addCase(checkAuth.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.response?.data;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.response?.data;
    });
  },
});
export const { forceUpdate, clearError } = user.actions;

export const selectUserState = (state: RootState) => state?.user;

export const userSlice = user.reducer;
