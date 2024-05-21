import { styled, css } from "styled-components";

export const Wrapper = styled.div`
  a {
    text-decoration: none;
    font-weight: 550;
    font-size: 0.995rem;
  }

  ${({ flag }) =>
    !flag &&
    css`
      .ant-layout-sider {
        border-radius: 35px;
        // margin: 15px;
        // background: #2a3650 !important;
        // .ant-menu-inline,
        // .ant-menu-sub {
        //   background: transparent !important;
        // }
        // .ant-menu-title-content {
        //   color: #ffff;
        // }
      }

      .ant-menu-item-selected {
        border-radius: 15px;
        overflow: visible;
        position: relative;
        &::before {
          content: "";
          width: 90px;
          height: 83px;
          position: absolute;
          border-radius: 50px;
          bottom: 40px;
          right: -6px;
          box-shadow: 50px 50px 0 0 #f5f5f5;
          z-index: -1;
        }
      }

      .ant-menu.ant-menu-inline .ant-menu-item-selected::after {
        content: "";
        width: 90px;
        height: 83px;
        position: absolute;
        border-radius: 50px;
        top: 40px;
        right: -6px;
        box-shadow: 50px -50px 0 0 #f5f5f5;
      }

      .ant-menu-submenu-title {
        font-weight: 550;
        font-size: 0.995rem;
      }
    `}
`;
