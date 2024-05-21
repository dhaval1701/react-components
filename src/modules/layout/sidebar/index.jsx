import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import payload from "./lib";
import full_logo from "../../../../public/media/logos/openai.svg";
import full_icon from "../../../../public/media/logos/full_icon.svg";
import { Wrapper } from "./style";
import { useTheme } from "../../../ThemeContext";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const Sidebar = (props) => {
  const { token } = theme.useToken();
  const { collapsed, setCollapsed } = props;
  // const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { theme1, isDarkMode, toggleTheme } = useTheme();

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

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Wrapper>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: isDarkMode ? token.colorBgContainer : null,
        }}
        // style={{ minHeight: "100vh" }}
        width={252}
        //   onCollapse={(value) => setCollapsed(value)}
      >
        <div className="d-flex justify-content-between align-items-center p-3">
          <div className="demo-logo-vertical ">
            {collapsed ? (
              <img
                src={full_logo}
                alt="Collapsed Logo"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <img
                src="https://admin.pixelstrap.net/mofi/assets/images/logo/logo_light.png"
                alt="Collapsed Logo"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  paddingLeft: "10px",
                }}
              />
            )}
          </div>
          <div className="collapse-button d-flex justify-content-center">
            {collapsed ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={20}
                  onClick={handleCollapsed}
                >
                  <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
                </svg>
              </>
            ) : (
              <>
                <svg
                  width={24}
                  viewBox="0 0 24 24"
                  fill="rgba(255,255,255,1)"
                  onClick={handleCollapsed}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 2H10C10.6 2 11 2.4 11 3V10C11 10.6 10.6 11 10 11H3C2.4 11 2 10.6 2 10V3C2 2.4 2.4 2 3 2Z"
                    fill="white"
                  />
                  <path
                    opacity="0.3"
                    d="M14 2H21C21.6 2 22 2.4 22 3V10C22 10.6 21.6 11 21 11H14C13.4 11 13 10.6 13 10V3C13 2.4 13.4 2 14 2Z"
                    fill="white"
                  />
                  <path
                    opacity="0.3"
                    d="M3 13H10C10.6 13 11 13.4 11 14V21C11 21.6 10.6 22 10 22H3C2.4 22 2 21.6 2 21V14C2 13.4 2.4 13 3 13Z"
                    fill="white"
                  />
                  <path
                    opacity="0.3"
                    d="M14 13H21C21.6 13 22 13.4 22 14V21C22 21.6 21.6 22 21 22H14C13.4 22 13 21.6 13 21V14C13 13.4 13.4 13 14 13Z"
                    fill="white"
                  />
                </svg>
              </>
            )}
          </div>
        </div>

        <div style={{ padding: "25px 0px 0px 28px" }}>
          <div
            style={{
              padding: "6px 10px",
              width: "fit-content",
            }}
          >
            <Button type="primary">Hello </Button>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
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
export default Sidebar;
