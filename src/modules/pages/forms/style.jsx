import styled from "styled-components";

export const Wrapper = styled.div`
  .menu-card {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    position: relative;
  }

  .add-submenu-container {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
  }

  .icon-container {
    width: 40px;
    height: 40px;
    padding: 3px;
    border: 1px dashed black;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .submenu-item {
    display: flex;
    padding: 15px;
    // background-color: #f9f9f9;
    border: 1px dashed #ccc;
    border-radius: 7px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .remove-icon {
    color: red;
    cursor: pointer;
  }

  .add-submenu-button {
    margin-top: 8px;
    border: 1px dashed #1890ff;
    background-color: #e6f7ff;
    color: #1890ff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .form-footer {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
  }

  // demo menu style
  .ant-menu-light.ant-menu-root.ant-menu-inline {
    background: #b4c6fb;
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
`;
