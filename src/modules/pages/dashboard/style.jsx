import styled from "styled-components";

export const Wrapper = styled.div`
  .section {
    min-height: 100vh;
  }

  .custom-card {
    border-radius: 8px;
    // box-shadow: -2px 8px 3px 1px rgba(0, 0, 0, 0.2); /* Box shadow only on the top side */
    height: 120px;
    overflow: hidden;
    perspective: 1000px;
  }

  // .custom-card:hover {
  //   transform: scale(1.2);
  // }

  .custom-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .custom-card:hover .custom-card-inner {
    transform: rotateY(180deg);
  }

  .custom-card-front,
  .custom-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .custom-card-front {
    background-color: #bbb;
    color: black;
  }

  .custom-card-back {
    background-color: red;
    color: black;
    transform: rotateY(180deg);
  }

  // .custom-card:hover {
  //   transform: skewY(20deg);
  // }

  .card1 {
    // background-color: #fff;
    padding:110px
    box-shadow: 0 1px 2px rgba(220, 225, 232, 0.5),
      0 1px 2px rgba(220, 225, 232, 0.5);
    border-radius: 8px;
  }

  .badge{
    background-color: red;

    top: 20px;
    left: -11px;
    transform: rotate(-45deg);
  }
`;
