import styled from "styled-components";

export const Wrapper = styled.div`
  .list-item {
    position: relative;
    list-style: none;
  }

  .hover-button {
    display: none;
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translate(-50%, -50%);
  }

  .list-item:hover .hover-button {
    display: inline-block;
  }
`;
