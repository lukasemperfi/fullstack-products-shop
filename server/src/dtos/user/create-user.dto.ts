export class CreateUserDto {
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string | null;
  phone_number?: string;
  password: string;
}
