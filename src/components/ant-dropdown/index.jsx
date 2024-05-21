import React, { useEffect, useState } from "react";
import { DownOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Upload, message } from "antd";
import { IMAGE } from "../../config";

const { Dragger } = Upload;

const AntDropdown = ({ width, apiProps, showList, closeDropdown }) => {
  const { endpoint, keyName } = apiProps;
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [gotResult, setGotResult] = useState(false);

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger") {
      setOpen(nextOpen);
    }
    if (info.source === "menu" && !closeDropdown && gotResult) {
      setOpen(nextOpen);
    }
    if (info.source === "menu" && closeDropdown && gotResult) {
      setOpen(!nextOpen);
    }
  };

  const headerItem = (
    <p key="header" style={{ minWidth: "20vh", fontWeight: "bold" }}>
      Upload File
    </p>
  );

  useEffect(() => {
    if (gotResult) {
      handleOpenChange(true, { source: "menu" });
    }
  }, [gotResult]);

  // const url = "http://54.145.106.53/cheddy-gcp/file"
  const imageUrl = "hello.com/";
  const dynamicActionURL = `${imageUrl}${endpoint}`;

  const fileTypesMap = {
    images: "image/*", // Accept all image types
    documents: ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.txt", // Common document formats
    pdf: ".pdf",
    word: ".doc,.docx",
    excel: ".xls,.xlsx",
    powerpoint: ".ppt,.pptx",
    csv: "text/csv",
    text: "text/plain",
    video: "video/*", // Accept all video types
    audio: "audio/*", // Accept all audio types
    zip: "application/zip,.zip",
    all: "*/*", // Accept all file types
  };

  // Function to get accept value based on keyName array
  const getAcceptValue = (keyNames) => {
    let acceptValue = "";
    keyNames.forEach((keyName, index) => {
      const fileType = fileTypesMap[keyName];
      if (fileType) {
        acceptValue += fileType;
        if (index < keyNames.length - 1) {
          acceptValue += ",";
        }
      }
    });
    return acceptValue;
  };

  const props = {
    name: keyName ? keyName : "file",
    multiple: true,
    action: endpoint
      ? dynamicActionURL
      : "https://www.mocky.io/v2/5e8b89a22d00005200bfb120",
    fileList,
    accept:
      keyName && Array.isArray(keyName) ? getAcceptValue(keyName) : undefined,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      setFileList(info.fileList); // Update file list state
      if (status === "done") {
        setGotResult(true);
        message.success(`${info.file.name} file uploaded successfully.`);
        if (!showList) {
          setFileList([]);
        }
      } else if (status === "error") {
        setGotResult(true);
        if (!showList) {
          setFileList([]);
        }
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const bodyItem = (
    <div
      key="body"
      style={{
        width: width ? width : "300px",
        maxHeight: "40vh",
        overflowY: "auto",
      }}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: "#1677ff" }} />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>
    </div>
  );

  const items = [
    {
      label: <>{headerItem}</>,
      key: "1",
    },
    {
      label: <>{bodyItem}</>,
      key: "2",
    },
  ];

  const section = (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#343331",
        borderRadius: "8px",
        outline: "none",
        boxShadow:
          "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      {headerItem}
      {bodyItem}
    </div>
  );

  return (
    <Dropdown
      onOpenChange={handleOpenChange}
      open={open}
      //   menu={{
      //     items,
      //   }}
      dropdownRender={() => <>{section}</>}
      trigger={["click"]}
    >
      <Button>Upload File</Button>
    </Dropdown>
  );
};

export default AntDropdown;
