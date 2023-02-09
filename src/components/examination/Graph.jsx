import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Graph = (props) => {
  return (
    <ResponsiveContainer>
      <BarChart data={props.data} siz margin={{ left: props.leftMargin }}>
        {/* <Line type="monotone" dataKey="result" stroke="#ffffff" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip /> */}
        <CartesianGrid stroke="#ccc" vertical={false} />
        <XAxis dataKey="date" stroke={props.color} hide={props.hide} />
        <YAxis
          style={{ fontSize: `${props.fontSize}` }}
          stroke={props.color}
          axisLine={false}
          tickLine={false}
        />
        <Bar
          dataKey="result"
          barSize={props.barSize}
          fill={props.color}
          radius={2}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph;
