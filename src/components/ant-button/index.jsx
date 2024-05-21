import React from "react";
import { Button } from "antd";

const AntButton = ({ icon, iconPosition, color, variant, ...props }) => {
  let buttonStyle = {};
  let buttonClassName = "";

  // Apply variant styles
  if (variant === "fill") {
    buttonStyle = {
      ...buttonStyle,
      backgroundColor: color,
      borderColor: color,
      color: "#fff",
    };
  } else if (variant === "outline") {
    buttonStyle = { ...buttonStyle, borderColor: color, color };
  }

  // Set icon position
  const renderIcon = () => {
    if (icon) {
      return (
        <span
          style={{
            marginRight: iconPosition === "right" ? 0 : 10,
            marginLeft: iconPosition === "right" ? 10 : 0,
          }}
        >
          {icon}
        </span>
      );
    }
    return null;
  };

  return (
    <Button
      icon={iconPosition ? null : icon}
      loading={true}
      style={{ ...buttonStyle }} // Additional styling for color, shape, and variant
      className={buttonClassName} // Additional class names for custom styling
      {...props} // Spread the rest of the props
    >
      {iconPosition === "left" && renderIcon()} {/* Render icon on the left */}
      {props.children}
      {iconPosition === "right" && renderIcon()}{" "}
      {/* Render icon on the right */}
    </Button>
  );
};

export default AntButton;
