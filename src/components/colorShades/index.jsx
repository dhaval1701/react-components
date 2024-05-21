import React from "react";

const ColorShades = ({ brandColor }) => {
  const generateShades = (color) => {
    const shades = [];
    // Convert HEX to RGB
    const hexToRgb = (hex) =>
      hex
        .replace(
          /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
          (m, r, g, b) => "#" + r + r + g + g + b + b
        )
        .substring(1)
        .match(/.{2}/g)
        .map((x) => parseInt(x, 16));

    const rgbColor = hexToRgb(color);

    // Generate lighter shades
    for (let i = 1; i <= 4; i++) {
      const lighterShade = rgbColor.map((value) =>
        Math.min(Math.round(value + value * 0.2 * i), 255)
      );
      shades.push(
        `#${lighterShade.map((x) => x.toString(16).padStart(2, "0")).join("")}`
      );
    }

    // Generate darker shades
    for (let i = 1; i <= 4; i++) {
      const darkerShade = rgbColor.map((value) =>
        Math.max(Math.round(value - value * 0.2 * i), 0)
      );
      shades.push(
        `#${darkerShade.map((x) => x.toString(16).padStart(2, "0")).join("")}`
      );
    }

    return shades;
  };

  const shades = generateShades(brandColor);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {shades.map((shade, index) => (
          <div
            key={index}
            style={{
              backgroundColor: shade,
              width: "50px",
              height: "50px",
              margin: "5px",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorShades;
