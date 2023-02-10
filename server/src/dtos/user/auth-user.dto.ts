import { UserDto } from "./user.dto";

export class AuthUserDto {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}
