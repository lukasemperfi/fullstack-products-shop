import { AxiosResponse } from "axios";

import { SuccessResponseDto } from "api/dtos/response/success-response.dto";
import { RoleDto } from "api/dtos/user/role";
import { UserDto } from "api/dtos/user/user.dto";
import { httpApi } from "api/http";
import { UserPath } from "./user-path";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

class User {
  public getUsers = async (): Promise<
    AxiosResponse<SuccessResponseDto<UserDto[]>>
  > => {
    const response = await httpApi.get<SuccessResponseDto<UserDto[]>>(
      UserPath.users
    );

    return response;
  };

  public getRoles = async (): Promise<
    AxiosResponse<SuccessResponseDto<RoleDto[]>>
  > => {
    const response = await httpApi.get<SuccessResponseDto<RoleDto[]>>(
      UserPath.users + "/" + "roles"
    );

    return response;
  };

  public updateUser = async (
    newUser: FormData,
    user_id: number
  ): Promise<AxiosResponse<SuccessResponseDto<null>>> => {
    const response = await httpApi.patch<SuccessResponseDto<null>>(
      UserPath.users + "/" + user_id + "/profile",
      newUser,
      config
    );

    return response;
  };
  public deleteUser = async (
    user_id: number
  ): Promise<AxiosResponse<SuccessResponseDto<null>>> => {
    const response = await httpApi.delete<SuccessResponseDto<null>>(
      UserPath.users + "/" + user_id
    );

    return response;
  };

  public updateRoles = async (
    roles: string[],
    user_id: number
  ): Promise<AxiosResponse<SuccessResponseDto<null>>> => {
    const response = await httpApi.patch<SuccessResponseDto<null>>(
      UserPath.users + "/" + user_id + "/roles",
      {
        roles,
      }
    );

    return response;
  };
}

export const userService = new User();
