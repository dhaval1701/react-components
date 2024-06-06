import React, { useState } from "react";
import { Layout } from "antd";

const { Footer } = Layout;

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
