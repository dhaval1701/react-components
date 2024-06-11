import React from "react";
import Pie from "../../../components/am-charts/semi-circle-pie-chart";
import LineHighChart from "../../../components/high-chart/line-chart";
import BarChartD3 from "../../../components/d3-chart/bar-chart";
import MapAmCharts from "../../../components/am-charts/map-chart";
import CandleStickHighChart from "../../../components/high-chart/candle-stick-chart";

const Charts = () => {
  return (
    <>
      <h1>Chart Practice</h1>
      <Pie chartID="pie-two" />
      <LineHighChart />
      {/* <CandleStickHighChart /> */}
      {/* <BarChartD3 /> */}
      {/* <MapAmCharts chartID="map-am-chart" /> */}
    </>
  );
};

export default Charts;
