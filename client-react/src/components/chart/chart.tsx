import cn from "classnames";
import { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  title: string;
  data: any[];
  dataKey: string;
  grid?: boolean;
  className?: string;
}

export const Chart: FC<ChartProps> = ({
  title,
  data,
  dataKey,
  grid,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
