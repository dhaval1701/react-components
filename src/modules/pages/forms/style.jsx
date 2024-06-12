import styled from "styled-components";

export const Wrapper = styled.div`
  .menu-card {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
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
    background-color: #f9f9f9;
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

  .ant-menu-item {
    color: #0d0c225c;
  }

  .ant-menu-submenu-title {
    font-weight: 550;
    font-size: 0.995rem;
    color: #0d0c225c;
  }

  .ant-menu-item-selected {
    color: #c41d7f;
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

  .ant-menu .ant-menu-submenu-title:hover {
    color: #c41d7f;
  }
`;
