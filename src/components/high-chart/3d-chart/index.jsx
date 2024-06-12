import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3d from "highcharts/highcharts-3d";

Highcharts3d(Highcharts);

const ThreeDHighChart = () => {
  useEffect(() => {
    return () => {};
  }, []);

  const options = {
    chart: {
      type: "column",
      //   options3d: {
      //     enabled: true,
      //     alpha: 15,
      //     beta: 15,
      //     viewDistance: 25,
      //     depth: 40,
      //   },
    },

    title: {
      text: " Electricity production in countries, grouped by continent",
      align: "left",
    },

    xAxis: {
      labels: {
        skew3d: true,
        style: {
          fontSize: "16px",
        },
      },
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: "TWh",
        skew3d: true,
        style: {
          fontSize: "16px",
        },
      },
    },

    tooltip: {
      headerFormat: "<b>{point.key}</b><br>",
      pointFormat:
        '<span style="color:{series.color}">\u25CF</span> ' +
        "{series.name}: {point.y}",
    },

    plotOptions: {
      series: {
        pointStart: 2016,
      },
      column: {
        stacking: "normal",
        depth: 40,
      },
    },

    series: [
      {
        name: "South Korea",
        data: [563, 567, 590, 582, 571],
        stack: "Asia",
        tooltip: {
          valuePrefix: "$",
        },
      },
      {
        name: "Germany",
        data: [65, 65, 43, 12, 57],
        stack: "Asia",
        tooltip: {
          valueSuffix: "%",
        },
      },
      {
        name: "Saudi Arabia",
        data: [368, 378, 378, 367, 363],
        stack: "Asia",
        // tooltip: {
        //     valuePrefix: "$",
        //   },
      },
      //   {
      //     name: "France",
      //     data: [564, 562, 582, 571, 533],
      //     stack: "Europe",
      //   },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ThreeDHighChart;
