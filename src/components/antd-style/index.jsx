import React from "react";
import { ConfigProvider } from "antd";
import { createStyles } from "antd-style";
import { generate } from "@ant-design/colors";

export const generateStyles = (
  mainBgColor,
  selectedItemBgColor,
  selectedItemColor,
  hoverColor,
  hoverBgColor,
  extraStyleComponentName
) => {
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const menuPrefixCls = getPrefixCls("menu");

  const shades = generate(selectedItemBgColor);

  const extraStyles = createStyles(({ css }) => ({
    submenu: css`
      .${menuPrefixCls}-item-selected,
        .${menuPrefixCls}-submenu-selected
        .${menuPrefixCls}-submenu-title,
        .${menuPrefixCls}-submenu-selected
        .${menuPrefixCls}-submenu-title:hover {
        background: ${selectedItemBgColor};
        // overflow: auto;
        max-height: 100%;
        height: 100%;
      }
    `,
  }))();

  const tokenStyles = {
    token: {
      //   colorText: selectedItemBgColor,
      colorPrimary: "blue",
      // colorPrimary: selectedItemBgColor,
      colorLink: selectedItemBgColor,
    },
    components: {
      Layout: {
        headerBg: mainBgColor,
        // lightSiderBg: mainBgColor,
        lightTriggerBg: hoverColor,
        siderBg: mainBgColor,
        // colorBgElevated: "black",
      },
      Menu: {
        itemActiveBg: hoverBgColor,
        itemBg: "transparent",
        itemHoverBg: hoverBgColor,
        itemHoverColor: hoverColor,
        itemSelectedBg: selectedItemBgColor,
        itemSelectedColor: selectedItemColor,
        popupBg: mainBgColor,
      },

      Select: {
        colorBgElevated: shades[0],
        optionSelectedBg: shades[3],
        selectorBg: shades[0],
        colorBorder: shades[3],
        colorPrimaryBg: shades[5],
        colorPrimaryHover: shades[5],
        colorPrimary: shades[5],
      },
      DatePicker: {
        colorBgElevated: shades[0],
        optionSelectedBg: shades[3],
        selectorBg: shades[0],
        colorBorder: shades[3],
        colorPrimaryBg: shades[5],
        colorPrimaryHover: shades[5],
        colorPrimary: shades[5],
        colorBgContainer: shades[0],
      },
    },
  };

  const sideBarTheme = {
    theme: {
      ...tokenStyles,
    },
    // Comment if you use sidebar 2 design
    // menu: { className: extraStyles.styles.submenu },
  };

  return { sideBarTheme };
};
