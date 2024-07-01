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

  .ant-menu-item-selected {
    transition: color 0.2s ease !important;
    background-color: #f9f9f9 !important;

    .ant-menu-title-content {
      color: #443dba !important;
      font-weight: 600;
      &:hover {
        color: #443dba !important;
      }
    }

    &:hover {
    }
  }

  .ant-menu-item {
    font-weight: 550;
    color: #4b5675;
    &:hover {
      background-color: #f9f9f9 !important;
      .ant-menu-title-content {
        color: #443dba !important;
        font-weight: 600;
        &:hover {
          color: #443dba !important;
        }
      }
    }
  }
`;
