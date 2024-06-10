import { styled, css } from "styled-components";

export const Wrapper = styled.div`
  a {
    text-decoration: none;
    font-weight: 550;
    font-size: 0.875rem;
  }

  .sidebar-1-hover {
    overflow: hidden;
    &:hover {
      overflow: auto;
    }
  }

  ${({ flag }) =>
    !flag &&
    css`
      .ant-menu-submenu-title {
        font-weight: 550;
        font-size: 0.995rem;
      }

      .ant-menu-item-selected {
        border-radius: 5px;
        &::before {
          content: "";

          background: ${(props) => props.selectedColor};
          width: 4px;
          height: 25px;
          position: absolute;
          left: 5px;
          border-radius: 10px;
          box-shadow: ${(props) => props.selectedColor} 0px 7px 29px 0px;
        }
      }
    `}
`;
