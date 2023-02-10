export interface CreateUserDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone?: string | null;
  avatar?: File | null;
}
