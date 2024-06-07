import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineHighChart = () => {
  const options = {
    title: {
      text: "Currency Exchange Rate",
    },
    yAxis: {
      title: {
        text: "Exchange Rate (USD)",
      },
      labels: {
        formatter: function () {
          return "$" + this.value;
        },
      },
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        month: "%e. %b",
        year: "%b",
      },
      title: {
        text: "Date",
      },
    },
    series: [
      {
        name: "USD to EUR",
        data: [
          [Date.UTC(2022, 0, 1), 0.89],
          [Date.UTC(2022, 1, 1), 0.88],
          [Date.UTC(2022, 2, 1), 0.87],
          [Date.UTC(2022, 3, 1), 0.86],
          [Date.UTC(2022, 4, 1), 0.85],
          [Date.UTC(2022, 5, 1), 0.84],
        ],
        tooltip: {
          valuePrefix: "$",
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineHighChart;
