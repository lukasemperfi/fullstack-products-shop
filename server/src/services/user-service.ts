import bcrypt from "bcrypt";

import { User } from "../db/models/user.model";
import { CreateUserRequestBodyDto } from "../dtos/user/create-user-request-body.dto";
import { filesService } from "./files.service";
import { UserRoleDto } from "../dtos/user/user-role.dto";
import { UserDto } from "../dtos/user/user.dto";
import { Role } from "../db/models/role.model";

class UserService {
  async updateUser(
    newUser: CreateUserRequestBodyDto,
    user_id: string
  ): Promise<void> {
    const { password, avatar, ...rest } = newUser;
    const avatarImagePath = avatar
      ? filesService.generateImagesPath(avatar)[0]
      : null;
    const avatarData = avatarImagePath && {
      avatar: avatarImagePath,
    };
    const hashPassword = await bcrypt.hash(password, 3);
    const user = {
      ...rest,
      ...avatarData,
      password: hashPassword,
    };

    await User.updateUser(user, user_id);
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await User.getUsers();

    return users;
  }

  async deleteUser(user_id: number): Promise<void> {
    await User.deleteUser(user_id);
  }

  async updateRoles(roles: UserRoleDto, user_id: string): Promise<void> {
    await User.updateRoles(roles, user_id);
  }

  async getRoles(): Promise<Role[]> {
    const roles = await User.getRoles();

    return roles;
  }
}

export const userService = new UserService();
