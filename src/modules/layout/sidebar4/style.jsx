import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 150px;

  a {
    text-decoration: none;
    font-weight: 550;
    font-size: 0.995rem;
  }

  .ant-menu-item {
    color: #0d0c225c;
  }

  .ant-menu-submenu-title {
    font-weight: 550;
    font-size: 0.995rem;
    color: #0d0c225c;
  }

  .ant-menu-item-selected {
    color: #000;
  }

  .ant-menu-submenu .ant-menu-item {
    position: relative;
    overflow: visible;
    &::before {
      content: "";
      background: #9e9e9e;
      width: 1px;
      height: 50px;
      border-radius: 0px;
      position: absolute;
    }
  }

  .ant-menu-inline-collapsed .ant-menu-item-selected::before,
  .ant-menu-inline-collapsed .ant-menu-submenu-selected::before {
    content: "";
    position: absolute;
    width: 4px;
    height: 40px;
    left: 10px;
    background: black;
  }
`;
