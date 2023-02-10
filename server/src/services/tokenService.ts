import jwt from "jsonwebtoken";

import { Token } from "../db/models/token";
import { UserDto } from "../dtos/user/user.dto";

class TokenService {
  generateTokens(payload: UserDto): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || "", {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || "",
      { expiresIn: "30d" }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string): UserDto {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || "");

    return userData as UserDto;
  }

  validateRefreshToken(token: string): UserDto {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || "");

    return userData as UserDto;
  }

  async saveToken(
    userId: number,
    refreshToken: string
  ): Promise<number | Token> {
    const tokenData = await Token.query().findOne({ user_id: userId });

    if (tokenData) {
      const tokenNewId = await Token.query()
        .findOne({ user_id: userId })
        .patch({ refreshToken: refreshToken });

      return tokenNewId;
    }

    const token = await Token.query().insert({ user_id: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken: string): Promise<number> {
    const deleteNum = await Token.query()
      .delete()
      .where("refreshToken", "=", refreshToken);

    return deleteNum;
  }

  async findToken(refreshToken: string): Promise<Token | undefined> {
    const tokenData = await Token.query().findOne({ refreshToken });

    return tokenData;
  }
}

export const tokenService = new TokenService();
