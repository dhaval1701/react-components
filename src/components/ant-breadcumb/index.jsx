import React from "react";
import { Breadcrumb } from "antd";

const AntBreadCumb = ({ url }) => {
  // Split the URL path by '/'
  const pathSegments = url
    .split("/")
    .filter((segment) => segment.trim() !== "");

  const menuItems = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          General
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          Layout
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          Navigation
        </a>
      ),
    },
  ];

  // Construct breadcrumb items with conditional dropdown
  const breadcrumbItems = pathSegments.map((segment, index) => {
    if (index === 0 && pathSegments.length > 1) {
      // Condition for dropdown
      return {
        title: segment.trim(),
        menu: {
          items: menuItems,
        },
      };
    } else {
      return {
        title: segment.trim(),
      };
    }
  });

  return <Breadcrumb items={breadcrumbItems} />;
};

export default AntBreadCumb;
