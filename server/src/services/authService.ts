import bcrypt from "bcrypt";

import { BadRequest } from "../exceptions/bad-request";
import { User } from "../db/models/user.model";
import { UserDto } from "../dtos/user/user.dto";
import { ApiError } from "../exceptions/api-error";
import { tokenService } from "./tokenService";
import { CreateUserRequestBodyDto } from "../dtos/user/create-user-request-body.dto";
import { NotFoundError } from "../exceptions/not-found-error";
import { AuthUserDto } from "../dtos/user/auth-user.dto";

class AuthService {
  async registration(newUser: CreateUserRequestBodyDto): Promise<AuthUserDto> {
    const { first_name, last_name, email, password } = newUser;

    const candidate = await User.query().findOne({ email });

    if (candidate) {
      throw BadRequest.create("Validation error", {
        email: `User with email ${email} already exist`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = (await User.createUser({
      first_name,
      last_name,
      email,
      password: hashPassword,
    })) as UserDto;

    if (!user) {
      throw NotFoundError.create("user not found");
    }

    const userDto = new UserDto({ ...user });
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email: string, password: string): Promise<AuthUserDto> {
    const existedUser = await User.query().findOne({ email });

    if (!existedUser) {
      throw BadRequest.create("Validation error", {
        email: `User with email ${email} not found`,
      });
    }

    const isPassEquals = await bcrypt.compare(password, existedUser.password);

    if (!isPassEquals) {
      throw BadRequest.create("Validation error", {
        password: `Incorrect password`,
      });
    }
    const user = (await User.getUserById(existedUser.id)) as UserDto;

    if (!user) {
      throw NotFoundError.create("user not found");
    }

    const userDto = new UserDto({ ...user });
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string): Promise<number> {
    const numDeleted = await tokenService.removeToken(refreshToken);

    return numDeleted;
  }

  async refresh(refreshToken: string): Promise<AuthUserDto> {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = (await User.getUserById(userData.id)) as UserDto;

    if (!user) {
      throw ApiError.BadRequest(`Пользователь с не найден`);
    }

    const userDto = new UserDto({ ...user });
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

export const authService = new AuthService();
