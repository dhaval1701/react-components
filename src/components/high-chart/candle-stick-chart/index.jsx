import React, { useEffect } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const CandleStickHighChart = () => {
  useEffect(() => {
    const fetchAndRenderChart = async () => {
      try {
        // Fetch data asynchronously
        const response = await fetch(
          "https://www.highcharts.com/samples/data/new-intraday.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Set up Highcharts options
        const options = {
          rangeSelector: {
            buttons: [
              {
                type: "hour",
                count: 1,
                text: "1h",
              },
              {
                type: "day",
                count: 1,
                text: "1D",
              },
              {
                type: "all",
                count: 1,
                text: "All",
              },
            ],
            selected: 1,
            inputEnabled: false,
          },

          title: {
            text: "Stock Trades",
          },
          xAxis: {
            type: "datetime",
          },
          yAxis: {
            title: {
              text: "Price",
            },
          },
          series: [
            {
              name: "AAPL",
              type: "candlestick",
              data: data,
              tooltip: {
                valueDecimals: 2,
              },
            },
          ],
        };

        // Initialize Highcharts chart
        Highcharts.stockChart("stock-chart", options);
      } catch (error) {
        console.error("Error fetching or rendering chart:", error);
      }
    };

    fetchAndRenderChart();
  }, []);

  return (
    <div id="stock-chart" className="highcharts-dark">
      {/* Chart will be rendered here */}
    </div>
  );
};

export default CandleStickHighChart;
