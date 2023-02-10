export interface UserDto {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  roles: { role: string; id: number }[];
  phone_number: string | null;
  avatar: string | null;
}
