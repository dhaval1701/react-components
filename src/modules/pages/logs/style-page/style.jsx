import styled from "styled-components";

export const Wrapper = styled.div`
  .ant-carousel .slick-dots li.slick-active button {
    background: #000000 !important;
    opacity: 1;
  }

  .ant-carousel .slick-dots li button {
    background: #615b5b !important;
  }

  /* Custom CSS in your stylesheet */
  .custom-width {
    width: 220px;
  }

  @media (min-width: 1200px) {
    /* Adjust this breakpoint as needed */
    .custom-width {
      width: auto;
    }
  }

  .ant-collapse
    > .ant-collapse-item
    > .ant-collapse-header
    .ant-collapse-expand-icon {
    height: 40px;
    display: flex;
    align-items: center;
    padding-inline-end: 12px;
  }
`;
