import React from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


import data from "./data";

const RejectClaimLineChart = () => (
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={data}
               margin={{top: 10, right: 0, left: -15, bottom: 0}}>
      <XAxis dataKey="name"/>
      <YAxis dataKey="amt"/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Legend/>
      <Line type="monotone" dataKey="Number of Rejected Claims" stroke="#003366" activeDot={{r: 8}}/>
    </LineChart>
  </ResponsiveContainer>
);

export default RejectClaimLineChart
