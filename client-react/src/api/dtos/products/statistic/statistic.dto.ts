import { ImageStatisticDto } from "../image/image-statistic.dto";

export interface ProductStatisticDto {
  most_viewed: Statistic;
  most_liked: Statistic;
  most_favorite: Statistic;
  users_for_curr_month: StatisticUsers[];
}

export type Statistic = {
  id: number;
  name: string;
  images: ImageStatisticDto[];
  total: number;
};

export type StatisticUsers = { day_of_month: number; total: number };
