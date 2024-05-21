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

import full_logo from "../../../../public/media/logos/openai.svg";
import full_icon from "../../../../public/media/logos/full_icon.svg";
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

const Sidebar1 = (props) => {
  const { token } = theme.useToken();
  const { collapsed, setCollapsed, visible, isSmallScreen } = props;
  const [collapsedButtonClick, setCollapsedButtonClick] = useState(false);
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

  // Array of vibrant colors
  const vibrantColors = ["#f5222d", "#fa541c", "#fadb14", "#1677ff", "#a0d911"];

  // Function to generate a random index
  const getRandomIndex = () => Math.floor(Math.random() * vibrantColors.length);

  const randomIndex = getRandomIndex();

  const handleCollapsed = () => {
    setCollapsedButtonClick(!collapsedButtonClick);
  };

  useEffect(() => {
    if (!collapsedButtonClick) {
      setCollapsed(false);
    } else {
      setCollapsed(!collapsed);
    }
  }, [collapsedButtonClick]);

  console.log(collapsed, "collapsed value");

  console.log(collapsedButtonClick, "collapsedButtonClick value");
  return (
    <Wrapper selectedColor={vibrantColors[randomIndex]} flag={isDarkMode}>
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
          display: isSmallScreen ? (visible ? "block" : "none") : "block",
          zIndex: isSmallScreen ? (visible ? 1053 : 0) : 0,
        }}
        // style={{ minHeight: "100vh" }}
        width={252}
        onMouseEnter={() => {
          collapsed && collapsedButtonClick ? setCollapsed(false) : null;
        }}
        onMouseLeave={() => {
          collapsedButtonClick ? setCollapsed(true) : null;
        }}

        //   onCollapse={(value) => setCollapsed(value)}
      >
        <div className="d-flex justify-content-between align-items-center px-3">
          <div className="demo-logo-vertical ">
            {collapsed ? (
              <img
                src="https://www.svgrepo.com/show/330433/figma.svg"
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
                src="https://www.svgrepo.com/show/5740/envato.svg"
                alt="Collapsed Logo"
                style={{
                  width: "100px",
                  height: "85px",
                  //   maxWidth: "100%",
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
                  <path d="M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"></path>
                </svg>
              </>
            ) : (
              <>
                <svg
                  width={24}
                  viewBox="0 0 24 24"
                  onClick={handleCollapsed}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"></path>
                </svg>
              </>
            )}
          </div>
        </div>

        <div style={{ paddingLeft: "25px" }}>
          <div
            style={{
              width: "fit-content",
            }}
          >
            <form
              className="d-flex justify-content-start align-items-center gap-2"
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#ffff",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                fill="currentColor"
              >
                <path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"></path>
              </svg>
              <input
                class="demo-input py-0 Typeahead-input form-control-plaintext w-100"
                type="text"
                placeholder="Search"
                name="q"
                title=""
              />
            </form>
          </div>
        </div>

        <div style={{ padding: "20px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "10px",
              color: "#0000008c",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            <p style={{ margin: 0 }}>GENERAL</p>
          </div>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={payload}
          />
        </div>

        <div style={{ padding: "20px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "10px",
              color: "#0000008c",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            <p style={{ margin: 0 }}>APPLICAITON</p>
          </div>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={items}
          />
        </div>
        <div
          style={{
            width: "100%",
            padding: "20px",
            position: "absolute",
            bottom: 10,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "2px solid #ccc",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <img
              src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp"
              alt="User"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
              John Doe
            </div>
            <div>john.doe@example.com</div>
          </div>
        </div>
      </Sider>
    </Wrapper>
  );
};
export default Sidebar1;
