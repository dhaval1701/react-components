import styled from "styled-components";

export const Wrapper = styled.div`
  //   .card-container {
  //     display: flex;
  //     flex-direction: column;
  //     align-items: center;
  //   }

  .card-wrapper {
    position: relative;
  }

  // .line {
  //   position: absolute;
  //   top: -90px;
  //   left: -16px;
  //   width: 12px; /* Adjust as needed */
  //   height: 100%; /* Adjust as needed */
  //   background-color: transparent;
  //   border: 1px solid black; /* Adjust border style and color as needed */
  //   border-right: none;
  //   border-bottom: none;
  // }

  .line {
    position: absolute;
    left: -16px;
    width: 12px; /* Adjust as needed */
    background-color: transparent;
    border-left: 1px solid black;
    // border: 2px solid black; /* Adjust border style and color as needed */
    // border-right: none;
    // border
  }

  // .line::before {
  //   content: "";
  //   position: absolute;
  //   top: 0; /* Position the circle vertically in the middle */
  //   left: -6px; /* Adjust to center the circle */
  //   width: 12px; /* Diameter of the circle */
  //   height: 12px; /* Diameter of the circle */
  //   background-color: black; /* Color of the circle */
  //   border-radius: 50%; /* Make it a circle */
  //   transform: translateY(-50%); /* Center the circle vertically */
  // }

  circle {
    position: absolute;
    top: 50%; /* Position the circle vertically in the middle */
    left: -8px; /* Adjust to center the circle */
    width: 16px; /* Diameter of the circle */
    height: 16px; /* Diameter of the circle */
    background-color: black; /* Color of the circle */
    border-radius: 50%; /* Make it a circle */
    transform: translateY(-50%); /* Center the circle vertically */
  }
`;
