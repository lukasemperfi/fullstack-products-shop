export interface CreateUserRequestBodyDto {
  first_name: string;
  last_name: string;
  email: string;
  avatar?: Express.Multer.File[] | null;
  phone_number?: string;
  password: string;
}
