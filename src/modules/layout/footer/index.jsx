import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const FooterAnt = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
};
export default FooterAnt;
