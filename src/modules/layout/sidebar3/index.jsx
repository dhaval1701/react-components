import React, { useEffect, useState } from "react";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Layout,
  List,
  Menu,
  theme,
} from "antd";
import { Outlet, useLocation } from "react-router-dom";

import { Wrapper } from "./style";
import { useTheme } from "../../../ThemeContext";
import payload from "../sidebar/lib";

const { Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const data = [
  {
    name: "John Doe",
    avatar: "https://example.com/avatar1.jpg", // URL to user's profile picture
  },
  {
    name: "Jane Smith",
    avatar: "https://example.com/avatar2.jpg", // URL to user's profile picture
  },
  {
    name: "Bob Johnson",
    avatar: "https://example.com/avatar3.jpg", // URL to user's profile picture
  },
];

const Sidebar3 = (props) => {
  const { token } = theme.useToken();
  const { collapsed, setCollapsed, visible, isSmallScreen } = props;
  const location = useLocation();
  const { theme1, isDarkMode, toggleTheme } = useTheme();
  const [selectedKey1, setSelectedKey1] = useState("/dashboard");

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

  return (
    <Wrapper selectedColor={vibrantColors[randomIndex]} flag={isDarkMode}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        // collapsedWidth={0}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: isDarkMode ? token.colorBgContainer : null,
          display: isSmallScreen ? (visible ? "block" : "none") : "block",
          zIndex: isSmallScreen ? (visible ? 1053 : 0) : 0,
        }}
        // style={{ minHeight: "100vh" }}
        width={252}
        //   onCollapse={(value) => setCollapsed(value)}
      >
        <div className="d-flex justify-content-end align-items-center pt-3 pe-2">
          <div
            className="collapse-button d-flex justify-content-center p-2"
            style={{ background: "#fff", borderRadius: "50px" }}
          >
            {collapsed ? (
              <>
                <svg
                  width={24}
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleCollapsed}
                >
                  <path d="m13 17 5-5-5-5"></path>
                  <path d="m6 17 5-5-5-5"></path>
                </svg>
              </>
            ) : (
              <>
                <svg
                  width={24}
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleCollapsed}
                >
                  <path d="m11 17-5-5 5-5"></path>
                  <path d="m18 17-5-5 5-5"></path>
                </svg>
              </>
            )}
          </div>
        </div>

        <div
          className="d-flex justify-content-start align-items-center p-1"
          style={{ borderBottom: "1px solid #ccc" }}
        >
          <div className="demo-logo-vertical ">
            {collapsed ? (
              <img
                src="https://www.svgrepo.com/show/112506/speckyboy.svg"
                alt="Collapsed Logo"
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <img
                src="https://www.svgrepo.com/show/112506/speckyboy.svg"
                alt="Collapsed Logo"
                style={{
                  width: "100px",
                  height: "85px",
                }}
              />
            )}
          </div>
        </div>

        <div
          style={{
            paddingLeft: "15px",
            marginTop: "10px",
            maxHeight: "30%",
            overflow: "auto",
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              color: "#0000008c",
              fontWeight: "bold",
              fontSize: "13px",
              textAlign: collapsed ? "center" : "start",
            }}
          >
            <p>GENERAL</p>
          </div>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={payload}
          />
        </div>

        {collapsed ? null : (
          <>
            <div
              style={{
                padding: "15px",
                borderTop: "1px solid #ccc",
              }}
            >
              <div
                style={{
                  color: "#0000008c",
                  fontWeight: "bold",
                  fontSize: "13px",
                  textAlign: collapsed ? "center" : "start",
                }}
              >
                <p>Detail</p>
              </div>{" "}
              <Card
                style={{
                  width: "90%", // Adjust the percentage value as needed
                  marginLeft: "auto", // Center the card horizontally within the sidebar
                  marginRight: "auto", // Center the card horizontally within the sidebar
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Adjust the values for your preferred shadow effect
                }}
              >
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <img
                    alt="logo"
                    src="https://via.placeholder.com/80"
                    style={{ maxWidth: "100%", maxHeight: 60 }}
                  />
                </div>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <h2>Product Name</h2>
                  <p>Description of the product goes here.</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Button type="primary" size="large">
                    Buy Now
                  </Button>
                </div>
              </Card>
            </div>
          </>
        )}

        <div
          style={{
            position: "absolute",
            bottom: 10,
            width: "100%",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <p> Sidebar Design ©{new Date().getFullYear()} </p>
        </div>
      </Sider>
    </Wrapper>
  );
};
export default Sidebar3;
