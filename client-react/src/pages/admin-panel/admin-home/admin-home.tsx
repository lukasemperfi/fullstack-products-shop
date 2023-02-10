import { useEffect } from "react";
import { Paper } from "@mui/material";
import cn from "classnames";
import moment from "moment";

import { Chart } from "components/chart/chart";
import classes from "./admin-home.module.scss";
import { PageContainer } from "components/page-container/page-container";
import { StatisticCard } from "components/admin-panel/statistic-card/statistic-card";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  getProductStatistic,
  selectProductsStatistic,
} from "store/products-statistic-slice/products-statistic-slice";
import {
  mapChartData,
  mapStatisticToStatisticCardDto,
} from "utils/admin-statistics";

export const AdminHome = () => {
  const dispatch = useAppDispatch();
  const productsStat = useAppSelector(selectProductsStatistic);
  const { most_viewed, most_liked, most_favorite } =
    mapStatisticToStatisticCardDto(productsStat) || {};
  const chartTitle = `Registered Users for ${moment().format("MMMM")}`;

  const dayInCurrMonth = moment().daysInMonth();
  const chartData = mapChartData(
    "Registered Users",
    dayInCurrMonth,
    productsStat?.users_for_curr_month
  );

  useEffect(() => {
    dispatch(getProductStatistic());
  }, []);

  return (
    <PageContainer className={classes["home"]}>
      <div className={cn(classes["home__widgets"], classes["widgets"])}>
        <Paper elevation={3} className={cn(classes["widgets__views"])}>
          {most_viewed && (
            <StatisticCard cardTitle="Most Viewed" productStat={most_viewed} />
          )}
        </Paper>
        <Paper elevation={3} className={cn(classes["widgets__favorites"])}>
          {most_liked && (
            <StatisticCard cardTitle="Most Liked" productStat={most_liked} />
          )}
        </Paper>
        <Paper elevation={3} className={cn(classes["widgets__likes"])}>
          {most_favorite && (
            <StatisticCard
              cardTitle="Most Favorite"
              productStat={most_favorite}
            />
          )}
        </Paper>
      </div>
      <div className={cn(classes["home__chart"], classes["chart"])}>
        <Paper>
          {chartData && (
            <Chart
              data={chartData}
              title={chartTitle}
              grid
              dataKey="Registered Users"
              className={classes["chart__users"]}
            />
          )}
        </Paper>
      </div>
    </PageContainer>
  );
};
