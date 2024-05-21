import React, { useState } from "react";
import {
  WalletOutlined,
  SafetyOutlined,
  LineChartOutlined,
  StarOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Popover,
  List,
  Button,
  Badge,
  Select,
} from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import AntBreadCumb from "../../../components/ant-breadcumb";
import { NotificationWrapper } from "./style";
import { useTheme } from "../../../ThemeContext";

const { Header, Content, Footer, Sider } = Layout;

const HeaderAnt = (props) => {
  const {
    visible,
    setVisible,
    isSmallScreen,
    collapsed,
    setCollapsed,
    sidebarShow,
    setSidebarShow,
  } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgLayout },
  } = theme.useToken();

  const { theme1, isDarkMode, toggleTheme } = useTheme();

  const handleRedirect = () => {
    localStorage.clear();
    navigate("/login");
  };

  const breadcrumb = (
    location?.pathname?.split("/")?.filter((d) => d) || []
  ).map((d) => {
    return { title: d?.charAt(0).toUpperCase() + d?.slice(1) };
  });

  const notificationContent = (
    <NotificationWrapper>
      <h5 className="f-18 f-w-600 mb-0 dropdown-title text-center border-bottom p-3">
        Notifications
      </h5>
      <ul className="notification-box p-3">
        <li>
          <div className="flex-shrink-0 ">
            <img
              src="../assets/images/dashboard/icon/wallet.png"
              alt="Wallet"
            />
          </div>
          <div className="flex-grow-1">
            <a href="private-chat.html">
              <h6>New daily offer added</h6>
            </a>
            <p>New user-only offer added</p>
          </div>
        </li>
        <li>
          <div className="flex-shrink-0 ">
            <img
              src="../assets/images/dashboard/icon/shield-dne.png"
              alt="Shield-dne"
            />
          </div>
          <div className="flex-grow-1">
            <a href="private-chat.html">
              <h6>Product Evaluation</h6>
            </a>
            <p>Changed to a new workflow</p>
          </div>
        </li>
        <li>
          <div className="flex-shrink-0 ">
            <img src="../assets/images/dashboard/icon/graph.png" alt="Graph" />
          </div>
          <div className="flex-grow-1">
            <a href="private-chat.html">
              <h6>Return of a Product</h6>
            </a>
            <p>452 items were returned</p>
          </div>
        </li>
        <li>
          <div className="flex-shrink-0 ">
            <img
              src="../assets/images/dashboard/icon/ticket-star.png"
              alt="Ticket-star"
            />
          </div>
          <div className="flex-grow-1">
            <a href="private-chat.html">
              <h6>Recently Paid</h6>
            </a>
            <p>Mastercard payment of $343</p>
          </div>
        </li>
        <li>
          <a className="f-w-700" href="private-chat.html">
            Check all
          </a>
        </li>
      </ul>
    </NotificationWrapper>
  );

  const bookmarkContent = (
    <div class="front">
      <h5 class="f-18 f-w-600 mb-0 dropdown-title text-center border-bottom p-3">
        Bookmark
      </h5>
      <ul className="notification-box p-3">
        <li>
          <div class="row">
            <div class="col-4 text-center">
              <div class="bookmark-content">
                <div class="bookmark-icon bg-light-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-file-text stroke-primary"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <span class="font-primary">Forms</span>
              </div>
            </div>
            <div class="col-4 text-center">
              <div class="bookmark-content">
                <div class="bookmark-icon bg-light-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-user stroke-secondary"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <span class="font-secondary">Profile</span>
              </div>
            </div>
            <div class="col-4 text-center">
              <div class="bookmark-content">
                <div class="bookmark-icon bg-light-warning">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-server stroke-warning"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="8"
                      rx="2"
                      ry="2"
                    ></rect>
                    <rect
                      x="2"
                      y="14"
                      width="20"
                      height="8"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="6" y1="6" x2="6" y2="6"></line>
                    <line x1="6" y1="18" x2="6" y2="18"></line>
                  </svg>
                </div>
                <span class="font-warning">Tables</span>
              </div>
            </div>
          </div>
        </li>
        <li class="text-center">
          <a class="flip-btn f-w-700" id="flip-btn" href="javascript:void(0)">
            Add New Bookmark
          </a>
        </li>
      </ul>
    </div>
  );

  const handleSidebarChange = (value) => {
    setSidebarShow((prevState) => {
      // Create a new object to hold updated sidebarShow values
      const updatedSidebarShow = {};

      // Loop through each sidebar key
      Object.keys(prevState).forEach((key) => {
        // Set the value of the selected sidebar to true, others to false
        updatedSidebarShow[key] = key === value;
      });

      // Return the updated sidebarShow object
      return updatedSidebarShow;
    });
  };

  return (
    <Header
      className="d-flex justify-content-between align-items-center p-4"
      // theme="light"
      style={{
        width: isSmallScreen
          ? "100%"
          : collapsed
          ? "calc(100% - 80px)"
          : "calc(100% - 252px)",
        position: "fixed",
        top: 0,
        zIndex: 8,
        padding: "15px 30px",
        background: colorBgContainer,
        boxShadow: "0px 4px 40px rgba(39, 32, 120, 0.1)",
        borderRadius: "15px",
      }}
      // style={{
      //   padding: 0,
      //   background: colorBgContainer,
      // }}
    >
      {" "}
      {!isSmallScreen ? (
        <div className="d-flex flex-column justify-content-between align-items-start pb-n5">
          <div>
            <h4
              style={{
                fontSize: "19px",
                fontWeight: "700",
                letterSpacing: "0.6px",
                marginBottom: "-1px",
              }}
            >
              {breadcrumb[0]?.title}
            </h4>
          </div>

          <div>
            <Breadcrumb>
              <Breadcrumb.Item>
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item
                style={{
                  fontWeight: "700",
                }}
              >
                Pages
              </Breadcrumb.Item>
              <Breadcrumb items={breadcrumb} />
            </Breadcrumb>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex flex-column justify-content-between align-items-start pb-n5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={20}
              fill="currentColor"
              onClick={() => setVisible(!visible)}
            >
              <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
            </svg>
          </div>
        </>
      )}
      {/* <AntBreadCumb url={location.pathname} /> */}
      {/* New div with search form, icons */}
      <div className="d-flex justify-content-between align-items-center gap-4">
        <div>
          <Select
            defaultValue="Select Sidebar"
            style={{ width: 200 }}
            onChange={handleSidebarChange}
          >
            {Object.keys(sidebarShow).map((sidebar) => (
              <Option key={sidebar} value={sidebar}>
                {sidebar}
              </Option>
            ))}
          </Select>
        </div>

        {/* Search form */}
        <form
          className="d-flex justify-content-start align-items-center gap-2"
          style={{
            padding: "10px",
            backgroundColor: colorBgLayout,
            borderRadius: "30px",
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
            placeholder="Search Mofi .."
            name="q"
            title=""
          />
        </form>

        {/* Notification icon */}
        <Popover
          placement="bottomRight"
          content={notificationContent}
          trigger="hover"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50px",
              padding: "10px 12px",

              position: "relative",
            }}
          >
            <Badge count={5}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                fill="currentColor"
              >
                <path d="M5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path>
              </svg>
            </Badge>
          </div>
        </Popover>

        {/* Bookmark icon */}
        <Popover
          placement="bottomRight"
          content={bookmarkContent}
          trigger="hover"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50px",
              padding: "10px 12px",

              position: "relative", // Added position relative to the parent div
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={20}
              fill="currentColor"
            >
              <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"></path>
            </svg>
          </div>
        </Popover>

        {/* Message icon */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50px",
            padding: "10px 12px",
            position: "relative", // Added position relative to the parent div
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={20}
            fill="currentColor"
          >
            <path d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3ZM12 17H14C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5H10C6.68629 5 4 7.68629 4 11C4 14.61 6.46208 16.9656 12 19.4798V17Z"></path>
          </svg>
        </div>

        {/* User icon */}
        <div className="d-flex justify-content-between align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={20}
            fill="currentColor"
          >
            <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
          </svg>
          <div
            class="d-flex flex-column justify-content-center"
            style={{ lineHeight: "20px", padding: "5px" }}
          >
            <span>Alen Miller</span>
            <p class="mb-0 font-outfit">
              UI Designer<i class="fa fa-angle-down"></i>
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50px",
            padding: "10px 12px",
            position: "relative", // Added position relative to the parent div
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={20}
            fill="currentColor"
            onClick={handleRedirect}
          >
            <path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path>
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50px",
            padding: "10px 12px",
            cursor: "pointer",
            position: "relative", // Added position relative to the parent div
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={20}
            fill="currentColor"
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <>
                <path d="M11.3807 2.01886C9.91573 3.38768 9 5.3369 9 7.49999C9 11.6421 12.3579 15 16.5 15C18.6631 15 20.6123 14.0843 21.9811 12.6193C21.6613 17.8537 17.3149 22 12 22C6.47715 22 2 17.5228 2 12C2 6.68514 6.14629 2.33869 11.3807 2.01886Z"></path>
              </>
            ) : (
              <>
                <path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"></path>
              </>
            )}
          </svg>
        </div>
      </div>
      {/* <button className="btn btn-primary" onClick={handleRedirect}>
        Logout
      </button> */}
    </Header>
  );
};
export default HeaderAnt;
