import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";

function Pie(props) {
  const { chartID } = props;

  // useLayoutEffect(() => {
  //   const root = am5.Root.new(chartID);
  //   root.setThemes([am5themes_Animated.new(root)]);

  //   const chart = root.container.children.push(
  //     am5percent.PieChart.new(root, {
  //       startAngle: 180,
  //       endAngle: 360,
  //       layout: root.verticalLayout,
  //       innerRadius: am5.percent(50),
  //     })
  //   );

  //   const series = chart.series.push(
  //     am5percent.PieSeries.new(root, {
  //       startAngle: 180,
  //       endAngle: 360,
  //       valueField: "value",
  //       categoryField: "category",
  //       alignLabels: false,
  //     })
  //   );

  //   series.states.create("hidden", {
  //     startAngle: 180,
  //     endAngle: 180,
  //   });

  //   const data = [
  //     { category: "Lithuania", value: 501.9 },
  //     { category: "Czechia", value: 301.9 },
  //     { category: "Ireland", value: 201.1 },
  //     { category: "Germany", value: 165.8 },
  //     { category: "Australia", value: 139.9 },
  //     { category: "Austria", value: 128.3 },
  //     { category: "UK", value: 99 },
  //   ];

  //   series.data.setAll(data);

  //   series.appear(1000, 100);

  //   return () => {
  //     root.dispose();
  //   };
  // }, [chartID]);

  useLayoutEffect(() => {
    const root = am5.Root.new(chartID);

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        innerRadius: am5.percent(20),
        startAngle: -90,
        endAngle: 180,
      })
    );

    // Data
    const data = [
      {
        category: "Treats",
        value: 8,
        full: 100,
        columnSettings: {
          fill: chart.get("colors").getIndex(13),
        },
      },
      {
        category: "Cupboard Cuts",
        value: 17,
        full: 100,
        columnSettings: {
          fill: chart.get("colors").getIndex(0),
        },
      },
      {
        category: "Pronto",
        value: 23,
        full: 100,
        columnSettings: {
          fill: chart.get("colors").getIndex(12),
        },
      },
      {
        category: "Nuggets",
        value: 75,
        full: 100,
        columnSettings: {
          fill: chart.get("colors").getIndex(28),
        },
      },
    ];

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
    const cursor = chart.set(
      "cursor",
      am5radar.RadarCursor.new(root, {
        behavior: "zoomX",
      })
    );

    cursor.lineY.set("visible", false);

    // Create axes and their renderers
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
    const xRenderer = am5radar.AxisRendererCircular.new(root, {
      //minGridDistance: 50
    });

    xRenderer.labels.template.setAll({
      radius: 10,
    });

    xRenderer.grid.template.setAll({
      forceHidden: true,
    });

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: xRenderer,
        min: 0,
        max: 100,
        strictMinMax: true,
        numberFormat: "#'%'",
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yRenderer = am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 20,
    });

    yRenderer.labels.template.setAll({
      centerX: am5.p100,
      fontWeight: "500",
      fontSize: 14,
      templateField: "columnSettings",
    });

    yRenderer.grid.template.setAll({
      forceHidden: true,
    });

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: yRenderer,
      })
    );

    yAxis.data.setAll(data);

    // Create series
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
    const series1 = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        clustered: false,
        valueXField: "full",
        categoryYField: "category",
        fill: root.interfaceColors.get("alternativeBackground"),
      })
    );

    series1.columns.template.setAll({
      width: am5.p100,
      fillOpacity: 0.08,
      strokeOpacity: 0,
      cornerRadius: 20,
    });

    series1.data.setAll(data);

    const series2 = chart.series.push(
      am5radar.RadarColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        clustered: false,
        valueXField: "value",
        categoryYField: "category",
      })
    );

    series2.columns.template.setAll({
      width: am5.p100,
      strokeOpacity: 0,
      tooltipText: "{category}: {valueX}%",
      cornerRadius: 20,
      templateField: "columnSettings",
    });

    series2.data.setAll(data);

    // Animate chart and series in
    // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);

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
