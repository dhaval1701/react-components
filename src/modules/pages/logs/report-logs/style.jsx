import styled from "styled-components";

export const Wrapper = styled.div`
  //   .card-container {
  //     display: flex;
  //     flex-direction: column;
  //     align-items: center;
  //   }

  .overflow {
    width: 200px; /* Adjust width as needed */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px solid #ccc;
  }

  .card-wrapper {
    position: relative;
    margin-bottom: 10px;
  }

  .button-wrapper {
    display: flex;
    align-items: center;
  }

  .button-wrapper > * {
    margin-right: 5px; /* Adjust the spacing between buttons */
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

  .circle {
    content: "";
    position: absolute;
    top: 0; /* Position the circle vertically in the middle */
    left: -6px; /* Adjust to center the circle */
    width: 12px; /* Diameter of the circle */
    height: 12px; /* Diameter of the circle */
    background-color: black; /* Color of the circle */
    border-radius: 50%; /* Make it a circle */
    transform: translateY(-50%); /* Center the circle vertically */
  }

  .rectangle {
    content: "";
    position: absolute;
    top: 0;
    left: -8px;
    width: 16px;
    height: 8px;
    background-color: black;
    // border-radius: 50%;
    transform: translateY(-50%);
  }

  .triangle {
    position: absolute;
    top: 0;
    left: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 16px solid black;
    transform: translateY(-50%);
  }

  .diamond {
    position: absolute;
    top: 0;
    left: -8px;
    width: 16px;
    height: 16px;
    background-color: black;
    transform: translateY(-50%) rotate(45deg);
  }

  .none {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: black;
    border-radius: 50%;
    transform: translateY(-50%);
  }
`;
