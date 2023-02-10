export class UserDto {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  password?: string;
  roles?: { role: string; id: number }[];
  avatar?: string | null;
  accessToken?: string;
  refreshToken?: string;

  constructor(model: UserDto) {
    this.id = model.id;
    this.email = model.email;
    this.first_name = model.first_name;
    this.last_name = model.last_name;
    this.phone_number = model.phone_number;
    this.roles = model.roles;
    this.avatar = model.avatar;
    this.accessToken = model.accessToken;
    this.refreshToken = model.refreshToken;
  }
}
