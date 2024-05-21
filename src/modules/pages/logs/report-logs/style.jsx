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

  .line {
    position: absolute;
    top: -90px;
    left: -16px;
    width: 12px; /* Adjust as needed */
    height: 100%; /* Adjust as needed */
    background-color: transparent;
    border: 1px solid black; /* Adjust border style and color as needed */
    border-right: none;
    border-bottom: none;
  }
`;
