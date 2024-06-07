import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent";

function Pie(props) {
  const { chartID } = props;

  useLayoutEffect(() => {
    const root = am5.Root.new(chartID);
    root.setThemes([am5themes_Animated.new(root)]);

    console.log(root, "root");
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        startAngle: 180,
        endAngle: 360,
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    console.log(chart, "chart");
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        startAngle: 180,
        endAngle: 360,
        valueField: "value",
        categoryField: "category",
        alignLabels: false,
      })
    );

    series.states.create("hidden", {
      startAngle: 180,
      endAngle: 180,
    });

    const data = [
      { category: "Lithuania", value: 501.9 },
      { category: "Czechia", value: 301.9 },
      { category: "Ireland", value: 201.1 },
      { category: "Germany", value: 165.8 },
      { category: "Australia", value: 139.9 },
      { category: "Austria", value: 128.3 },
      { category: "UK", value: 99 },
    ];

    series.data.setAll(data);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartID]);

  return (
    <div>
      <div id={chartID} style={{ width: "100%", height: "400px" }}></div>;
    </div>
  );
}

export default Pie;
