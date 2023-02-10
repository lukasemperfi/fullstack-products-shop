import { UserDto } from "../dtos/user/user.dto";

declare global {
  namespace Express {
    interface Request {
      user: UserDto;
    }
  }
}
