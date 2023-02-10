import { UserDto } from "../user/user.dto";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}
