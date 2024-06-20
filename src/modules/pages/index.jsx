import React, { useEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Drawer, Layout, Menu, theme, Space, Button } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../layout/sidebar";
import HeaderAnt from "../layout/header";
import FooterAnt from "../layout/footer";
import AntBreadCumb from "../../components/ant-breadcumb";
import debounce from "lodash.debounce";
import Sidebar1 from "../layout/sidebar1";
import Sidebar2 from "../layout/sidebar2";
import Sidebar3 from "../layout/sidebar3";
import Sidebar4 from "../layout/sidebar4";
import PageLoader from "../../components/page-loader";
import LoadingAnimation from "../../app-loader";
import Header2 from "../layout/header2";
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
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [sidebarShow, setSidebarShow] = useState({
    sidebar1: false,
    sidebar2: true,
    sidebar3: false,
    sidebar4: false,
  });
  // const [bootStatus, setBootStatus] = useState(true);
  const location = useLocation();
  const [collapsedButtonClick, setCollapsedButtonClick] = useState(false);

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

  const breadcrumb = (
    location?.pathname?.split("/")?.filter((d) => d) || []
  ).map((d) => {
    return { title: d?.charAt(0).toUpperCase() + d?.slice(1) };
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleClickOverlay = (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to parent elements
    onClose(); // Call the onClose function passed as prop to close the drawer
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setIsSmallScreen(window.innerWidth <= 992);
      setCollapsed(false);
      setVisible(false);
    }, 200);

    window.addEventListener("resize", debouncedHandleResize);
    debouncedHandleResize();

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  useEffect(() => {
    const userDiv = document.getElementById("user");

    const myDataSet = userDiv.dataset;

    console.log("dataset", myDataSet);

    return () => {};
  }, []);

  // event of reload
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     console.log(event, "event");
  //     // Do something when the page is about to reload
  //     // For example, show a confirmation message
  //     const confirmationMessage = "Are you sure you want to leave?";
  //     event.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
  //     return confirmationMessage; // Gecko, WebKit, Chrome <34
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     console.log("page is unmount");
  //   };
  // }, []);

  // if (bootStatus) {
  //   return (
  //     <div>
  //       <PageLoader />
  //     </div>
  //   );
  // }

  // if (true) {
  //   return (
  //     <>
  //       <LoadingAnimation />
  //     </>
  //   );
  // }

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: "2160px",
        margin: "auto",
      }}
    >
      <div
        id="user"
        data-id="123"
        data-name="John Doe"
        data-email="john@example.com"
      ></div>
      <Layout>
        {/* {!isSmallScreen && (
        // <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        // <Sidebar1 collapsed={collapsed} setCollapsed={setCollapsed} />
        <Sidebar2
          isSmallScreen={isSmallScreen}
          visible={visible}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      )} */}

        {sidebarShow.sidebar1 === true && (
          <>
            <Sidebar1
              isSmallScreen={isSmallScreen}
              visible={visible}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              collapsedButtonClick={collapsedButtonClick}
              handleCollapsed={handleCollapsed}
            />
          </>
        )}

        {sidebarShow.sidebar2 === true && (
          <>
            <Sidebar2
              isSmallScreen={isSmallScreen}
              visible={visible}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          </>
        )}
        {sidebarShow.sidebar3 === true && (
          <>
            <Sidebar3
              isSmallScreen={isSmallScreen}
              visible={visible}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          </>
        )}
        {sidebarShow.sidebar4 === true && (
          <>
            <Sidebar4
              isSmallScreen={isSmallScreen}
              visible={visible}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          </>
        )}

        {/* {isSmallScreen && (
        <Drawer
          placement="left"
          onClose={onClose}
          open={visible}
          width={252}
          // style={{ background: "red" }}
          // extra={
          //   <Space>
          //     <Button onClick={onClose}>Cancel</Button>
          //     <Button type="primary" onClick={onClose}>
          //       OK
          //     </Button>
          //   </Space>
          // }
        >
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </Drawer>
      )} */}
        {/* <Sidebar /> */}

        <Layout
          style={{
            marginLeft: isSmallScreen
              ? 0
              : collapsed || collapsedButtonClick
              ? 80
              : !collapsedButtonClick && 252,
            position: "relative", // Ensure Layout has a position to control z-index
            zIndex: isSmallScreen && visible ? 1052 : "auto", // Adjust the z-index as needed
          }}
        >
          {/* <div
          style={{
            position: "absolute", // Position the background to cover the entire Layout
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isSmallScreen && visible ? "#00000033" : "none", // Show background when necessary
            zIndex: isSmallScreen && visible ? 1051 : "auto", // Ensure background is below Layout but above other content
          }}
          onClick={handleClickOverlay}
        /> */}

          <HeaderAnt
            visible={visible}
            setVisible={setVisible}
            isSmallScreen={isSmallScreen}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            setSidebarShow={setSidebarShow}
            sidebarShow={sidebarShow}
            collapsedButtonClick={collapsedButtonClick}
          />
          <Header2 />
          {isSmallScreen && <AntBreadCumb url={location.pathname} />}
          <Content
            style={{
              margin: "60px 16px",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: "100vh",
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <FooterAnt />
        </Layout>
      </Layout>
    </div>
    // <div
    //   style={{
    //     minHeight: "100vh",
    //     maxWidth: "2160px",
    //     margin: "auto",
    //   }}
    // >
    //   <Layout
    //   // style={{
    //   //   marginLeft: isSmallScreen ? 0 : collapsed ? 80 : 252,
    //   //   position: "relative", // Ensure Layout has a position to control z-index
    //   //   zIndex: isSmallScreen && visible ? 1052 : "auto", // Adjust the z-index as needed
    //   // }}
    //   >
    //     <Header2 />

    //     <Content
    //       style={{
    //         margin: "60px 16px",
    //       }}
    //     >
    //       <div
    //         style={{
    //           padding: 24,
    //           minHeight: "100vh",
    //           borderRadius: borderRadiusLG,
    //         }}
    //       >
    //         <Outlet />
    //       </div>
    //     </Content>
    //     <FooterAnt />
    //   </Layout>
    // </div>
  );
};
export default App;
