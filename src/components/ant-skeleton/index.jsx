import React from "react";
import PropTypes from "prop-types";
import { Skeleton } from "antd";
import styled, { keyframes } from "styled-components";

// Define fade-out animation
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// Define ease-out animation
const easeOut = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
`;

// Styled Skeleton Node with animation
const StyledSkeletonNode = styled(Skeleton.Node)`
  &.skeleton-animation-fade-out {
    animation: ${fadeOut} 1s ease-in-out infinite alternate;
  }

  &.skeleton-animation-ease-out {
    animation: ${easeOut} 1s ease-in-out infinite alternate;
  }
`;

const AntSkeleton = ({ width, height, shape, animation, ...restProps }) => {
  const style = {};

  if (width) {
    style.width = width;
  }

  if (height) {
    style.height = height;
  }

  return (
    <StyledSkeletonNode
      style={style}
      className={`skeleton-animation-${animation}`}
      {...restProps}
    >
      <span style={{ borderRadius: shape === "circle" ? "50%" : "0" }}></span>
    </StyledSkeletonNode>
  );
};

AntSkeleton.defaultProps = {
  shape: "rectangular",
};

AntSkeleton.propTypes = {
  shape: PropTypes.oneOf(["circle", "rectangular"]),
  animation: PropTypes.oneOf(["fade-out", "ease-out"]), // Define animation prop type
};

export default AntSkeleton;
