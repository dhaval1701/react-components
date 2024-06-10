import React, { useEffect, useState } from "react";

import { Layout, Menu, Segmented, theme } from "antd";
import { useLocation } from "react-router-dom";

import { Wrapper } from "./style";
import { useTheme } from "../../../ThemeContext";
import payload from "../sidebar/lib";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Sidebar4 = (props) => {
  const { token } = theme.useToken();
  const { collapsed, setCollapsed, visible, isSmallScreen } = props;
  const location = useLocation();

  const pathname = location.pathname;

  // Recursive function to find the selected key
  const findSelectedKey = (items) => {
    for (const item of items) {
      if (item.children) {
        const childSelectedKey = findSelectedKey(item.children);
        if (childSelectedKey) {
          return childSelectedKey;
        }
      } else if (item.key === pathname) {
        return item.key;
      }
    }
  };

  // Call the function to find the selected key
  const selectedKey = findSelectedKey(payload);

  // Array of vibrant colors
  const vibrantColors = ["#f5222d", "#fa541c", "#fadb14", "#1677ff", "#a0d911"];

  // Function to generate a random index
  const getRandomIndex = () => Math.floor(Math.random() * vibrantColors.length);

  const randomIndex = getRandomIndex();

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  console.log(visible, "visible");

  return (
    <Wrapper selectedColor={vibrantColors[randomIndex]}>
      <Sider
        trigger={null}
        collapsible
        collapsed={true}
        style={{
          position: "sticky",
          minHeight: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#d3adf7",
        }}
        // style={{
        //   overflow: "auto",
        //   height: "100vh",
        //   position: "fixed",
        //   left: 0,
        //   top: 0,
        //   bottom: 0,
        //   background: isDarkMode ? token.colorBgContainer : null,
        //   display: isSmallScreen ? (visible ? "block" : "none") : "block",
        //   zIndex: isSmallScreen ? (visible ? 1053 : 0) : 0,
        // }}
        // width={252}
      >
        <div className="d-flex justify-content-start align-items-center p-3">
          <div className="demo-logo-vertical ">
            <img
              src="https://www.svgrepo.com/show/503156/amazon-1.svg"
              alt="Collapsed Logo"
              style={{
                width: "50px",
                height: "45px",
                //   maxWidth: "100%",
              }}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "5px",
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={payload}
          />
        </div>
      </Sider>

      <Sider
        trigger={null}
        style={{ position: "fixed", top: 0, left: 80, bottom: 0 }}
        width={252}
      >
        <div className="d-flex justify-content-start align-items-center px-3 pt-3">
          <div
            style={{
              color: "#0000008c",
              fontWeight: "bold",
              fontSize: "25px",
              textAlign: collapsed ? "center" : "start",
            }}
          >
            <p>GENERAL</p>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            paddingLeft: "30px",
          }}
        >
          <Segmented size="large" options={["Admin", "User"]} />
        </div>
        <div
          style={{
            marginTop: "10px",
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={payload}
          />
        </div>
      </Sider>
    </Wrapper>
  );
};

export default Sidebar4;
