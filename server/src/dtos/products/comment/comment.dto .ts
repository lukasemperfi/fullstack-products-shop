export interface CommentDto {
  first_name: string;
  last_name: string;
  avatar: string | null;
  id: number;
  text: string;
  created_at: string;
  user_id: number;
}
