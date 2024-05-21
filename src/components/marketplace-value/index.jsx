import { theme } from "antd";
import React from "react";

const processValue = (
  value,
  marketplace,
  sign,
  icon,
  iconStyle = {},
  valueStyle = {},
  iconDirection
) => {
  const { token } = theme.useToken();

  // Convert value to a number if it's not already
  if (isNaN(value)) {
    value = parseFloat(value);
  }

  // Check if value is negative
  const isNegative = value < 0;
  if (isNegative) {
    value = Math.abs(value); // Get absolute value for formatting
  }

  // Default styles for value and sign
  const defaultValueStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    color: token.colorText, // Default color
  };

  const defaultSignStyle = {
    fontSize: valueStyle ? valueStyle.fontSize : defaultValueStyle.fontSize,
  };

  // Merge default styles with provided styles
  const mergedValueStyle = { ...defaultValueStyle, ...valueStyle };

  // Check if a sign is present and adjust the value accordingly
  if (sign === "%" || !sign) {
    // If the sign is '%' or not provided, perform the same operations
    const decimalIndex = value.toString().indexOf(".");
    const decimalDigits =
      decimalIndex !== -1
        ? value.toString().substring(decimalIndex + 1).length
        : 0;

    // Calculate the multiplier dynamically based on the number of decimal digits
    const multiplier = Math.pow(10, decimalDigits);
    value *= multiplier;

    // Convert the value back to a decimal by dividing it by 100
    value /= 100;
    value = (
      <>
        <span style={mergedValueStyle}>{value}</span>
        <span style={defaultSignStyle}>{sign}</span>
      </>
    );

    // Add '%' sign after the value if sign is not provided
    if (!sign) {
      sign = "%";
      value = (
        <>
          <span style={mergedValueStyle}>{value}</span>
          <span style={defaultSignStyle}>{sign}</span>
        </>
      );
    }
  } else if (["IT", "DE", "TR", "ES", "NL"].includes(marketplace)) {
    // If the marketplace is Italy, format the value with comma as decimal separator and period as thousands separator
    value = value.toLocaleString("it-IT");
    value = (
      <>
        {isNegative ? "-" : ""}
        <span style={mergedValueStyle}>{value.toLocaleString()}</span>
        <span style={defaultSignStyle}>{sign}</span>
      </>
    );
  } else if (["FR", "CH", "BE"].includes(marketplace)) {
    value = value.toLocaleString("fr-FR");
    value = (
      <>
        {isNegative ? "-" : ""}
        <span style={mergedValueStyle}>{value.toLocaleString()}</span>
        <span style={defaultSignStyle}>{sign}</span>
      </>
    );
  } else {
    if (["UK", "USA"].includes(marketplace)) {
      value = (
        <>
          {isNegative ? "-" : ""}
          <span style={defaultSignStyle}>{sign}</span>
          <span style={mergedValueStyle}>{value.toLocaleString()}</span>
        </>
      );
    } else {
      // For other signs, place the currency sign after the number
      value = (
        <>
          {isNegative ? "-" : ""}
          <span style={mergedValueStyle}>{value.toLocaleString()}</span>
          {sign}
        </>
      );
    }
  }

  const { width, height, color, ...rest } = iconStyle;

  // Add the icon if specified
  if (icon === true) {
    if (iconDirection === "left") {
      return (
        <>
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={width || 16}
              height={height || 16}
              style={{ ...rest }}
            >
              <path
                fill={color || "currentColor"}
                d="M12 2L3 10h7v12h4V10h7z"
              />
            </svg>
            <span style={{ marginLeft: "5px" }}>{value}</span>
          </span>
        </>
      );
    } else {
      return (
        <>
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <span style={{ marginRight: "5px" }}>{value}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={width || 16}
              height={height || 16}
              style={{ ...rest }}
            >
              <path
                fill={color || "currentColor"}
                d="M12 2L3 10h7v12h4V10h7z"
              />
            </svg>
          </span>
        </>
      );
    }
    // Return JSX with SVG icon
  } else if (icon) {
    // If icon is a custom SVG icon, render it along with the value
    return (
      <>
        <span style={{ marginRight: "5px" }}>{value}</span>
        {icon}
      </>
    );
  }

  return value;
};

export default processValue;
