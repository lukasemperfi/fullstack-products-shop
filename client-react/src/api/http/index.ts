import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { AuthResponse } from "api/dtos/response/auth-response";
import { AuthPath } from "api/services/auth/auth-path";

export const httpApi = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
});

httpApi.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  return config;
});

httpApi.interceptors.response.use(
  (config: AxiosResponse) => {
    return config;
  },
  async (error: any) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          process.env.REACT_APP_BASE_URL + AuthPath.refresh,
          {
            withCredentials: true,
          }
        );

        localStorage.setItem("token", response.data.accessToken);
        return httpApi.request(originalRequest);
      } catch (e) {}
    }

    throw error;
  }
);
