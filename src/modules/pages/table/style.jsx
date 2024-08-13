import styled from "styled-components";

export const Wrapper = styled.div`
  //   .ant-table-wrapper .ant-table-sticky-holder {
  //     position: sticky;
  //     z-index: 3;
  //     background: #ffffff;
  //   }

  //   .ant-table-wrapper table {
  //     width: max-content;
  //     text-align: start;
  //     border-radius: 8px 8px 0 0;
  //     border-collapse: separate;
  //     border-spacing: 0;
  //   }

  // .ant-table-thead > tr > th {
  //   position: sticky;
  //   top: 0;
  //   background-color: #fff; /* Optional: Add a background color */
  //   z-index: 1; /* Ensure the header stays on top of other content */
  // }

  // .ant-table-cell {
  //   position: sticky;
  //   top: 58px;
  // }

  .ant-table-wrapper
    .ant-table-container
    table
    > thead
    > tr:first-child
    > *:first-child {
    border-start-start-radius: 8px;
    padding-left: 80px;
  }

  .ant-table-wrapper .ant-table-row-indent + .ant-table-row-expand-icon {
    margin-top: 2.5px;
    margin-inline-end: 50px;
  }

  // .ant-table-wrapper .ant-table-thead > tr > th {
  //   position: sticky;
  //   top: 58px;
  //   z-index: 3;
  // }
`;
