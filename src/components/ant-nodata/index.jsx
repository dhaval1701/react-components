import React from "react";
import { Result, Button } from "antd";
import {
  SmileOutlined,
  FrownOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const NoData = ({
  type,
  customMessage,
  isButton,
  onButtonClick,
  customIcon,
  buttonName: customButtonName,
}) => {
  let title = "";
  let icon = null;
  let status = null;
  let buttonName = "";

  switch (type) {
    case "NoData":
      status = "error";
      title = "No Data Found";
      icon = customIcon || <CloseCircleOutlined />;
      buttonName = customButtonName || "Back Home";
      break;
    case "Success":
      title = "Success";
      status = "success";
      icon = customIcon || <SmileOutlined />;
      buttonName = customButtonName || "Next";
      break;
    case "404":
      title = "404";
      status = "404";
      icon = customIcon;
      buttonName = customButtonName || "Back Home";
      break;
    case "403":
      title = "403";
      status = "403";
      icon = customIcon;
      buttonName = customButtonName || "Become a User";
      break;
    case "500":
      title = "500";
      status = "500";
      icon = customIcon;
      buttonName = customButtonName || "Oops";
      break;
    default:
      title = "Result";
      icon = customIcon || <SmileOutlined />;
  }

  return (
    <Result
      icon={
        customIcon ? (
          <div dangerouslySetInnerHTML={{ __html: customIcon }} />
        ) : (
          icon
        )
      }
      // icon={
      //   customIcon && (
      //     <div dangerouslySetInnerHTML={{ __html: customIcon }} />
      //   ) &&
      //   icon
      // }
      title={title}
      status={status}
      subTitle={customMessage}
      extra={
        isButton && (
          <Button type="primary" key="button" onClick={onButtonClick}>
            {buttonName}
          </Button>
        )
      }
    />
  );
};

export default NoData;
