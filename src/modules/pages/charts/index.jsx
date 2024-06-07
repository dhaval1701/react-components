import React from "react";
import Pie from "../../../components/am-charts/semi-circle-pie-chart";
import LineHighChart from "../../../components/high-chart/line-chart";
import BarChartD3 from "../../../components/d3-chart/bar-chart";

const Charts = () => {
  return (
    <>
      <h1>Chart Practice</h1>
      {/* <Pie chartID="pie-two" />
      <LineHighChart /> */}
      <BarChartD3 />
    </>
  );
};

export default Charts;
