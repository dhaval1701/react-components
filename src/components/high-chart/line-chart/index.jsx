import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DarkBlue from "highcharts/themes/high-contrast-dark";

// Apply the PreBuilt theme
DarkBlue(Highcharts);

const data = [
  {
    id: 1,
    date: "4/18/2024",
    value: 0.06,
  },
  {
    id: 2,
    date: "12/16/2023",
    value: 0.48,
  },
  {
    id: 3,
    date: "10/24/2023",
    value: 0.46,
  },
  {
    id: 4,
    date: "8/26/2023",
    value: 0.33,
  },
  {
    id: 5,
    date: "6/3/2024",
    value: 0.28,
  },
  {
    id: 6,
    date: "4/28/2024",
    value: 0.21,
  },
  {
    id: 7,
    date: "9/12/2023",
    value: 0.33,
  },
  {
    id: 8,
    date: "1/4/2024",
    value: 0.98,
  },
  {
    id: 9,
    date: "6/14/2023",
    value: 0.54,
  },
  {
    id: 10,
    date: "11/12/2023",
    value: 0.9,
  },
  {
    id: 11,
    date: "2/16/2024",
    value: 0.45,
  },
  {
    id: 12,
    date: "2/17/2024",
    value: 0.1,
  },
  {
    id: 13,
    date: "2/5/2024",
    value: 0.65,
  },
  {
    id: 14,
    date: "4/17/2024",
    value: 0.95,
  },
  {
    id: 15,
    date: "8/6/2023",
    value: 0.85,
  },
  {
    id: 16,
    date: "1/18/2024",
    value: 0.08,
  },
  {
    id: 17,
    date: "12/17/2023",
    value: 0.26,
  },
  {
    id: 18,
    date: "2/19/2024",
    value: 0.6,
  },
  {
    id: 19,
    date: "5/19/2024",
    value: 0.1,
  },
  {
    id: 20,
    date: "9/5/2023",
    value: 0.16,
  },
  {
    id: 21,
    date: "1/29/2024",
    value: 0.3,
  },
  {
    id: 22,
    date: "8/22/2023",
    value: 0.63,
  },
  {
    id: 23,
    date: "8/3/2023",
    value: 0.26,
  },
  {
    id: 24,
    date: "2/29/2024",
    value: 0.88,
  },
  {
    id: 25,
    date: "7/22/2023",
    value: 0.88,
  },
  {
    id: 26,
    date: "2/4/2024",
    value: 0.33,
  },
  {
    id: 27,
    date: "4/9/2024",
    value: 0.69,
  },
  {
    id: 28,
    date: "11/29/2023",
    value: 0.69,
  },
  {
    id: 29,
    date: "11/2/2023",
    value: 0.84,
  },
  {
    id: 30,
    date: "11/29/2023",
    value: 0.36,
  },
  {
    id: 31,
    date: "1/15/2024",
    value: 0.14,
  },
  {
    id: 32,
    date: "9/23/2023",
    value: 0.66,
  },
  {
    id: 33,
    date: "12/4/2023",
    value: 0.95,
  },
  {
    id: 34,
    date: "2/8/2024",
    value: 0.54,
  },
  {
    id: 35,
    date: "2/27/2024",
    value: 0.87,
  },
  {
    id: 36,
    date: "9/28/2023",
    value: 0.73,
  },
  {
    id: 37,
    date: "7/27/2023",
    value: 0.54,
  },
  {
    id: 38,
    date: "3/24/2024",
    value: 0.61,
  },
  {
    id: 39,
    date: "9/11/2023",
    value: 0.05,
  },
  {
    id: 40,
    date: "11/17/2023",
    value: 0.22,
  },
  {
    id: 41,
    date: "7/29/2023",
    value: 0.73,
  },
  {
    id: 42,
    date: "8/19/2023",
    value: 0.31,
  },
  {
    id: 43,
    date: "3/5/2024",
    value: 0.98,
  },
  {
    id: 44,
    date: "3/23/2024",
    value: 0.12,
  },
  {
    id: 45,
    date: "3/29/2024",
    value: 0.3,
  },
  {
    id: 46,
    date: "12/22/2023",
    value: 0.68,
  },
  {
    id: 47,
    date: "2/17/2024",
    value: 0.23,
  },
  {
    id: 48,
    date: "5/2/2024",
    value: 0.24,
  },
  {
    id: 49,
    date: "2/28/2024",
    value: 0.8,
  },
  {
    id: 50,
    date: "8/21/2023",
    value: 0.88,
  },
];

const LineHighChart = () => {
  const options = {
    // -------------------------------------------custom theme--------------------------------------------
    // colors: [
    //   "#058DC7",
    //   "#50B432",
    //   "#ED561B",
    //   "#DDDF00",
    //   "#24CBE5",
    //   "#64E572",
    //   "#FF9655",
    //   "#FFF263",
    //   "#6AF9C4",
    // ],
    // chart: {
    //   backgroundColor: {
    //     linearGradient: [0, 0, 500, 500],
    //     stops: [
    //       [0, "rgb(255, 255, 255)"],
    //       [1, "rgb(240, 240, 255)"],
    //     ],
    //   },
    //   borderWidth: 2,
    //   plotBackgroundColor: "rgba(255, 255, 255, .9)",
    //   plotShadow: true,
    //   plotBorderWidth: 1,
    // },
    chart: {
      type: "line",
    },
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
        data: data.map((item) => [item.date, item.value]),
        tooltip: {
          valuePrefix: "$",
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineHighChart;
