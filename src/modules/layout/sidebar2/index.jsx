import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";

import { Wrapper } from "./style";
import { useTheme } from "../../../ThemeContext";
import payload from "../sidebar/lib";
import { transformedMenu } from "../../../components/menu-items";
import Icons from "../../../icon";

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

const Sidebar2 = (props) => {
  const { token } = theme.useToken();
  const [menus, setMenus] = useState([]);
  const { collapsed, setCollapsed, visible, isSmallScreen } = props;
  // const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { isDarkMode } = useTheme();

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

  useEffect(() => {
    // Fetching menus from localStorage
    const storedMenus = localStorage.getItem("menus");

    if (storedMenus) {
      setMenus(JSON.parse(storedMenus));
    }

    // Listen for the custom event "menusChanged"
    const handleStorageChange = () => {
      const updatedMenus = localStorage.getItem("menus");
      if (updatedMenus) {
        setMenus(JSON.parse(updatedMenus));
      }
    };

    window.addEventListener("menusChanged", handleStorageChange);

    return () => {
      window.removeEventListener("menusChanged", handleStorageChange);
    };
  }, []);

  // const menus1 = [
  //   {
  //     path: "/dashboard",
  //     icon: <span>Icons</span>,
  //     index: 1,
  //     isAdmin: false,
  //     label: "Dashboard",
  //     isChild: [
  //       {
  //         path: "/dashboard/email-setup",
  //         icon: <Icons type="email-setup" />,
  //         label: "Email Setup",
  //       },
  //     ],
  //   },
  //   {
  //     path: "/manage-user",
  //     icon: <span>Icons</span>,
  //     isAdmin: true,
  //     label: "Manage User",
  //     index: 0,
  //   },
  // ];

  const menuValues = transformedMenu(menus);

  return (
    <Wrapper flag={isDarkMode}>
      <Sider
        trigger={null}
        // collapsible
        // collapsed={collapsed}
        style={{
          overflow: "hidden",
          height: "100vh",
          position: "fixed",
          left: "auto",
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
        <div className="d-flex justify-content-between align-items-center px-3">
          <div className="demo-logo-vertical ">
            {collapsed ? (
              <img
                src="https://www.svgrepo.com/show/28992/codrops.svg"
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
                src="https://www.svgrepo.com/show/28992/codrops.svg"
                alt="Collapsed Logo"
                style={{
                  width: "200px",
                  height: "100px",
                  //   maxWidth: "100%",
                  paddingLeft: "10px",
                }}
              />
            )}
          </div>
          {/* <div className="collapse-button d-flex justify-content-center">
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
          </div> */}
        </div>

        <div style={{ paddingLeft: "25px", marginTop: "80px" }}>
          {/* <div
            style={{
              display: "inline-block",
              padding: "10px",
              color: "#0000008c",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            <p style={{ margin: 0 }}>GENERAL</p>
          </div> */}
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuValues}
          />
        </div>

        <div
          style={{
            width: "100%",
            position: "absolute",
            padding: "20px",
            bottom: 10,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <Button
            style={{
              backgroundColor: "#2f54eb",
              color: "#f5f5f5",
              marginBottom: "50px",
              borderRadius: "50px",
            }}
          >
            <svg
              width={18}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 28"
              fill="currentColor"
            >
              <path d="M16.0503 12.0498L21 16.9996L16.0503 21.9493L14.636 20.5351L17.172 17.9988L4 17.9996V15.9996L17.172 15.9988L14.636 13.464L16.0503 12.0498ZM7.94975 2.0498L9.36396 3.46402L6.828 5.9988L20 5.99955V7.99955L6.828 7.9988L9.36396 10.5351L7.94975 11.9493L3 6.99955L7.94975 2.0498Z"></path>
            </svg>
          </Button>
          <p> Sidebar Design ©{new Date().getFullYear()} </p>
        </div>
      </Sider>
    </Wrapper>
  );
};
export default Sidebar2;
