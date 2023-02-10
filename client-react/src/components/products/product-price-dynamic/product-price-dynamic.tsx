import { FC } from "react";

import classes from "./product-price-dynamic.module.scss";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ProductPriceDynamicProps {
  prices: number[];
}

export const ProductPriceDynamic: FC<ProductPriceDynamicProps> = ({
  prices,
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: prices,
        borderColor: "#766ed3",
        backgroundColor: "#766ed3",
      },
    ],
  };

  return (
    <div className={classes["container"]}>
      <Line options={options} data={data} updateMode="resize" />
    </div>
  );
};
