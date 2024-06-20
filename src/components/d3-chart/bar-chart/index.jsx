import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChartD3 = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  const data = [
    { label: "A", value: 10 },
    { label: "B", value: 20 },
    { label: "C", value: 15 },
    { label: "D", value: 25 },
    { label: "E", value: 30 },
  ];

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);

    // Define dimensions and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear existing chart
    svg.selectAll("*").remove();

    // Create scales
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Add bars
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.label))
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value))
      .attr("width", x.bandwidth())
      .attr("fill", "steelblue")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`<strong>${d.label}</strong>: ${d.value}`)
          .style("left", `${event.pageX - 350}px`)
          .style("top", `${event.pageY - 400}px`);
      })
      .on("mouseout", function () {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [data]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <svg ref={svgRef} width={600} height={400}></svg>
        <div
          ref={tooltipRef}
          className="tooltip"
          style={{
            opacity: 0,
            position: "absolute",
            background: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            padding: "0.5rem",
            borderRadius: "0.5rem",
          }}
        ></div>
      </div>
    </>
  );
};

export default BarChartD3;
