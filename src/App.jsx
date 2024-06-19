import { Suspense, useContext, useEffect, useState } from "react";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  useLocation,
  BrowserRouter,
  Routes,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { ConfigProvider, Switch, theme, Button, Card } from "antd";
import { generate, presetPalettes } from "@ant-design/colors";
import { useTheme } from "./ThemeContext";
import { generateStyles } from "./components/antd-style";
import { DndContext } from "@dnd-kit/core";
import LoadingAnimation from "./app-loader";
// import { router } from "./app-routes";
import "daterangepicker/daterangepicker.css";
import "daterangepicker";
import { GlobalContext } from "./commonContext";
import Login from "./modules/pages/auth";
import Page from "./modules/pages/index";
import { AdminRoutes, PageRoutes, routeObject } from "./router";

const { defaultAlgorithm, darkAlgorithm } = theme;

const isAuthenticated = () => {
  console.log(localStorage.getItem("isLoggedIn"), "isLoggedIn");
  return localStorage.getItem("isLoggedIn") === "true";
};

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

function App() {
  const { theme1, isDarkMode, toggleTheme } = useTheme();
  const brandColor = "#a0d911"; // Your brand color
  const dynamicTheme = generateDynamicLightTheme(brandColor);
  const darkLightTheme = generateTheme(isDarkMode);

  const { data, updateCommonGlobalVal } = useContext(GlobalContext);

  console.log(routeObject, "routeObject");

  // Define routes based on user type
  const userRoutes = data?.userType_ ? routeObject[data?.userType_] : [];

  console.log(userRoutes, "user Routes");

  // Create routes with only createBrowserRouter
  const router1 = createBrowserRouter([
    {
      path: "/login",
      element: (
        <Suspense fallback={<LoadingAnimation />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: <div>404</div>,
    },
    ...(userRoutes?.length > 0
      ? [
          {
            path: "/",
            element: (
              <Suspense fallback={<LoadingAnimation />}>
                <PrivateRoute element={<Page />} />
              </Suspense>
            ),
            children: [...userRoutes],
            // children: userRoutes.map((route) => ({
            //   path: route.path,
            //   element: route.element,
            // })),
          },
        ]
      : []),
  ]);

  // Create routes with only createBrowserRouter and createRoutesFromElements
  const routes = createRoutesFromElements(
    <>
      <Route
        path="/login"
        element={
          <Suspense fallback={<LoadingAnimation />}>
            <Login />
          </Suspense>
        }
      />
      <Route path="*" element={<div>404</div>} />
      {userRoutes?.length > 0 && (
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingAnimation />}>
              <PrivateRoute element={<Page />} />
            </Suspense>
          }
        >
          {userRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      )}
    </>
  );

  const router = createBrowserRouter(routes);

  // const generateStyles =
  //   (mainBgColor,
  //   selectedItemBgColor,
  //   selectedItemColor,
  //   hoverColor,
  //   hoverBgColor,
  //   extraStyleComponentName
  //   );

  // Sidebar1 usage
  // const { sideBarTheme } = generateStyles(
  //   "#00000005",
  //   "#0000000d",
  //   "#000000",
  //   "#000000",
  //   "#0000000d",
  //   "menu"
  // );

  // Sidebar2 usage
  const { sideBarTheme } = generateStyles(
    "#d6e4ff",
    "#f5f5f5",
    "#000000",
    "#000000",
    "#0000000d",
    // "transparent",  for sidebar 2 use
    "menu"
  );

  // Sidebar3 usage
  // const { sideBarTheme } = generateStyles(
  //   // "url('https://img.freepik.com/free-photo/abstract-luxury-plain-blur-grey-black-gradient-used-as-background-studio-wall-display-your-products_1258-100448.jpg?t=st=1711530670~exp=1711531270~hmac=4c0303537663bd22d5bab766daa2da8e8de2f03dffedde77a63bcbe463868e88')",
  //   "#ffffff",
  //   "transparent",
  //   "#c41d7f",
  //   "#c41d7f",
  //   "#0000000d",
  //   "menu"
  // );

  // Sidebar4 usage

  // const { sideBarTheme } = generateStyles(
  //   "#f9f0ff",
  //   "transparent",
  //   "#000",
  //   "#000000",
  //   "#0000000d",
  //   "menu"
  // );

  const darkTheme = {
    theme: {
      algorithm: darkAlgorithm,
      token: {
        fontFamily: `"CustomFont", sans-serif`,
      },
    },
  };

  return (
    <>
      <ConfigProvider {...(isDarkMode ? darkTheme : sideBarTheme)}>
        <RouterProvider router={router1} />
      </ConfigProvider>
    </>
  );
}

export default App;

// ["primary", "secondary", "ternary", "quaternary"],

const colorThemes = {
  light: {
    background: ["#ffe7ba", "#fff7e6", "#e0e0e0", "#d3d3d3"],
    text: ["#000000", "#333333", "#666666", "#999999"],
  },
  dark: {
    background: ["#212121", "#343331", "#555555", "#666666"],
    text: ["#ffffff", "#f0f0f0", "#cccccc", "#999999"],
  },
};

const generateSidebar = (
  mainBgColor,
  selectedItemBgColor,
  selectedItemColor,
  hoverColor,
  hoverBgColor
) => {
  const { styles } = useSubMenuStyle();

  console.log(styles, "submenu style");
  return {
    components: {
      Layout: {
        // headerBg: mainBgColor,
        // lightSiderBg: mainBgColor,
        lightTriggerBg: hoverColor,
        siderBg: mainBgColor,
        // colorBgElevated: "black",
      },
      Menu: {
        itemActiveBg: hoverBgColor,
        itemBg: mainBgColor,
        itemHoverBg: hoverBgColor,
        itemHoverColor: hoverColor,
        itemSelectedBg: selectedItemBgColor,
        itemSelectedColor: selectedItemColor,
        popupBg: mainBgColor,
        className: styles.submenu,
      },
    },
  };
};

const generateTheme = (isDarkMode) => {
  return {
    token: {
      fontFamily: `"Outfit", sans-serif, sans-serif`,

      // secondary
      // colorBgLayout: isDarkMode ? "#212121" : "#f5f5f5",
      // primary
      // colorBgContainer: isDarkMode ? "#343331" : "#ffffff",

      // -----------BACKGROUND--------------
      // secondary
      colorBgLayout: isDarkMode
        ? colorThemes.dark.background[1]
        : colorThemes.light.background[1],
      // primary
      colorBgContainer: isDarkMode
        ? colorThemes.dark.background[0]
        : colorThemes.light.background[0],

      colorBgElevated: isDarkMode
        ? colorThemes.dark.background[2]
        : colorThemes.light.background[2],

      // -----------TEXT COLOR--------------
      colorText: isDarkMode
        ? colorThemes.dark.text[0]
        : colorThemes.light.text[0],
      colorTextSecondary: isDarkMode
        ? colorThemes.dark.text[1]
        : colorThemes.light.text[1],
      colorTextTertiary: isDarkMode
        ? colorThemes.dark.text[2]
        : colorThemes.light.text[2],
      colorTextQuaternary: isDarkMode
        ? colorThemes.dark.text[3]
        : colorThemes.light.text[3],

      colorBorderSecondary: isDarkMode
        ? colorThemes.dark.background[1]
        : colorThemes.light.background[1],

      colorBorder: isDarkMode
        ? colorThemes.dark.background[1]
        : colorThemes.light.background[1],
      // colorBgLayout: isDarkMode ? "red" : "red",

      components: {
        Layout: {
          // Set component colors dynamically
          headerBg: colorThemes.dark.background[1],
          siderBg: colorThemes.dark.background[1],
        },
        Menu: {
          // Set component colors dynamically
          itemBg: colorThemes.dark.background[1],
          itemSelectedBg: colorThemes.dark.background[1],
          groupTitleColor: colorThemes.dark.background[1],
          itemSelectedColor: colorThemes.dark.background[1],
        },
      },
    },
  };
};

const generateDynamicLightTheme = (brandColor) => {
  const shades = generate(brandColor);

  return {
    token: {
      fontFamily: `"Outfit", sans-serif, sans-serif`,
    },
    components: {
      Select: {
        // Set component colors dynamically
        // You may need to adjust the index based on your generated shades
        colorBgElevated: shades[0],
        optionSelectedBg: shades[3],
        selectorBg: shades[0],
        colorBorder: shades[3],
        colorPrimaryBg: shades[5],
        colorPrimaryHover: shades[5],
        colorPrimary: shades[5],
      },
      DatePicker: {
        // Set component colors dynamically
        colorBgElevated: shades[0],
        optionSelectedBg: shades[3],
        selectorBg: shades[0],
        colorBorder: shades[3],
        colorPrimaryBg: shades[5],
        colorPrimaryHover: shades[5],
        colorPrimary: shades[5],
        colorBgContainer: shades[0],
      },
      Layout: {
        // Set component colors dynamically
        headerBg: shades[2],
        siderBg: shades[2],
        lightSiderBg: shades[2],
      },
      Menu: {
        // Set component colors dynamically
        itemBg: shades[2],
        itemSelectedBg: shades[5],
        groupTitleColor: shades[5],
        itemSelectedColor: shades[8],
      },
    },
  };
};

const generateDynamicDarkTheme = (brandColor) => {
  const reversedColors = generate(brandColor);
  const shades = reversedColors.slice().reverse(); // Reverse the array of colors
  console.log(shades, "shades");
  return {
    token: {
      fontFamily: `"Outfit", sans-serif, sans-serif`,
    },
    components: {
      Select: {
        // Set component colors dynamically
        // You may need to adjust the index based on your generated shades
        colorBgElevated: shades[2],
        optionSelectedBg: shades[3],
        selectorBg: shades[2],
        colorBorder: shades[7],
        colorPrimaryBg: shades[7],
        colorPrimaryHover: shades[7],
        colorPrimary: shades[7],
      },
      DatePicker: {
        // Set component colors dynamically
        colorBgElevated: shades[2],
        optionSelectedBg: shades[7],
        selectorBg: shades[2],
        colorBorder: shades[7],
        colorPrimaryBg: shades[7],
        colorPrimaryHover: shades[7],
        colorPrimary: shades[7],
        colorBgContainer: shades[2],
      },
      Layout: {
        // Set component colors dynamically
        headerBg: shades[2],
        siderBg: shades[2],
        lightSiderBg: shades[2],
      },
      Menu: {
        // Set component colors dynamically
        itemBg: shades[2],
        itemSelectedBg: shades[7],
        groupTitleColor: shades[7],
        itemSelectedColor: shades[9],
      },
    },
  };
};
