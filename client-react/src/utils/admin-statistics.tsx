import {
  ProductStatisticDto,
  Statistic,
  StatisticUsers,
} from "api/dtos/products/statistic/statistic.dto";
import { ReactComponent as ViewsIcon } from "assets/views.svg";
import { ReactComponent as StarIcon } from "assets/star.svg";
import { ReactComponent as LikeIcon } from "assets/like.svg";

export const mapStatisticToStatisticCardDto = (
  productsStatistic: ProductStatisticDto | null
) => {
  if (productsStatistic) {
    const prodStatArr = Object.entries(productsStatistic) as [
      string,
      Statistic
    ][];
    const statIcons = {
      most_viewed: <ViewsIcon />,
      most_liked: <LikeIcon fill="#52ff00" />,
      most_favorite: <StarIcon fill="#f8dc25" />,
    } as { [key: string]: any };

    const mappedStatistic = prodStatArr.reduce(
      (res: { [key: string]: any }, [key, statistic]) => {
        if (key === "users_for_curr_month") {
          res[key] = statistic;
          return res;
        } else {
          const { images, ...rest } = statistic;
          const image = images.length ? images[0].path : "#";

          res[key] = {
            ...rest,
            image,
            icon: statIcons[key],
          };
          return res;
        }
      },
      {}
    );

    return mappedStatistic;
  }
};

export const mapChartData = (
  dataKey: string,
  dayInCurrMonth: number,
  statistic?: StatisticUsers[]
) => {
  const days = Array.from({ length: dayInCurrMonth }, (v, i) => i + 1);

  return days.map((day) => {
    const existedObj = statistic?.find((el) => el.day_of_month === day);

    if (existedObj) {
      return {
        name: existedObj.day_of_month,
        [dataKey]: existedObj.total,
      };
    } else {
      return {
        name: day,
        [dataKey]: 0,
      };
    }
  });
};
