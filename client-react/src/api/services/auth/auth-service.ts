import { AxiosResponse } from "axios";

import { AuthResponse } from "api/dtos/response/auth-response";
import { SuccessResponseDto } from "api/dtos/response/success-response.dto";
import { CreateUserDto } from "api/dtos/user/create-user.dto copy";
import { httpApi } from "api/http";
import { AuthPath } from "./auth-path";

class Auth {
  public login = async (
    email: string,
    password: string
  ): Promise<AxiosResponse<SuccessResponseDto<AuthResponse>>> => {
    const response = await httpApi.post<SuccessResponseDto<AuthResponse>>(
      AuthPath.login,
      {
        email,
        password,
      }
    );

    return response;
  };

  public registration = async (
    newUser: CreateUserDto
  ): Promise<AxiosResponse<SuccessResponseDto<AuthResponse>>> => {
    const response = await httpApi.post<SuccessResponseDto<AuthResponse>>(
      AuthPath.registration,
      {
        ...newUser,
      }
    );

    return response;
  };
  public logout = async (): Promise<any> => {
    const response = await httpApi.post(AuthPath.logout);

    return response;
  };
}

export const authService = new Auth();
