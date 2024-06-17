import React, { useState } from "react";
import {
  PlusOutlined,
  MinusCircleOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { Wrapper } from "./style";
import {
  Badge,
  Card,
  Form,
  Space,
  Button,
  Input,
  InputNumber,
  Checkbox,
  Upload,
  Popover,
  Menu,
} from "antd";
import { Icon } from "@iconify/react";
import axios from "axios";

const menu = [
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <MinusOutlined />,
    children: [
      {
        key: "5",
        label: "Option 5",
      },
      {
        key: "6",
        label: "Option 6",
      },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          {
            key: "7",
            label: "Option 7",
          },
          {
            key: "8",
            label: "Option 8",
          },
        ],
      },
    ],
  },
];

const Forms = () => {
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [form] = Form.useForm();
  const [showChildren, setShowChildren] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [icons, setIcons] = useState([]);
  const [iconQuery, setIconQuery] = useState("");
  const [menu, setMenu] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [selectedChildIcon, setSelectedChildIcon] = useState({});
  const [currentChildIndex, setCurrentChildIndex] = useState(null);
  const [showPopover, setShowPopover] = useState(false);

  const [pathName, setPathName] = useState("");
  const [childPathName, setChildPathName] = useState("");

  const handleIconClick = () => {
    setShowCard(true);
    setShowPopover(true);
    setCurrentChildIndex(null);
  };

  const handleChildIconClick = (index) => {
    setShowCard(true);
    setShowPopover(true);
    setCurrentChildIndex(index);
  };

  const handleIconSelect = (icon) => {
    if (currentChildIndex === null) {
      setSelectedIcon(icon);
      form.setFieldsValue({ icon });
      setShowPopover(false);
      setIconQuery("");
      setIcons([]);
      updateMenu(form.getFieldsValue());
    } else {
      setSelectedChildIcon((prevState) => ({
        ...prevState,
        [currentChildIndex]: icon,
      }));
      // Update the children array in form values
      const updatedChildren = form
        .getFieldValue("children")
        .map((child, index) => {
          if (index === currentChildIndex) {
            return { ...child, icon };
          }
          return child;
        });
      form.setFieldsValue({ children: updatedChildren });

      setShowPopover(false);
      setIconQuery("");
      setIcons([]);
      updateMenu(form.getFieldsValue());
      console.log(updatedChildren, "children");
    }
  };

  // const handleMapIconClick = (icon, index) => {
  //   console.log(icon, index);
  //   form.setFieldsValue({ icon });
  //   setShowCard(false);
  // };

  const handleSearch = async () => {
    console.log("click");
    console.log(form.getFieldValue("path"));
    try {
      const response = await axios.get(
        `https://api.iconify.design/search?query=${iconQuery}`
      );
      setIcons(response.data.icons);
    } catch (error) {
      console.error("Error fetching icons:", error);
    }
  };

  const onCheckboxChange = (e) => {
    setShowChildren(e.target.checked);
  };

  const onFinish = (values) => {
    console.log("Received values from form: ", values);
    // const newMenu = [...menu, values];
    // setMenu(newMenu);
    form.resetFields();
    setSelectedIcon("");
    setSelectedChildIcon({});
  };

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  // const onFinish = (values) => {
  //   console.log("Values", values);
  // };

  // const onFinish = async (values) => {
  //   const { file, user } = values;

  //   console.log(file, "file");
  //   // Check if there's a file uploaded
  //   if (file && file.length > 0 && file[0].originFileObj) {
  //     const formData = new FormData();
  //     formData.append("file", file[0].originFileObj);

  //     console.log(formData, "formdata");
  //     try {
  //       // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
  //       const response = await fetch("YOUR_API_ENDPOINT", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       const data = await response.json();

  //       // Handle the response data
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error uploading the file:", error);
  //     }
  //   }

  //   // Handle other form fields like user
  //   console.log(user);
  // };

  // const validateFields = () => {
  //   const fields = Object.keys(form.getFieldsValue());

  //   const hasError = fields.some(
  //     (field) =>
  //       !form.getFieldValue(field) || form.getFieldError(field).length != 0
  //   );

  //   setButtonDisabled(hasError);
  // };

  console.log(form.getFieldValue("path"), "path value");
  const iconContent = (
    <div
      style={{
        padding: "10px",
        maxWidth: 500,
        maxHeight: 500,
        overflow: "auto",
      }}
    >
      <Space>
        <Input
          placeholder="Search for icons"
          value={iconQuery}
          onChange={(e) => setIconQuery(e.target.value)}
          onPressEnter={handleSearch}
          style={{ marginBottom: "8px" }}
        />
        <Button
          type="primary"
          onClick={handleSearch}
          style={{ marginBottom: "8px" }}
        >
          Search
        </Button>
      </Space>

      <Space wrap>
        {icons.map((icon, index) => (
          <Icon
            key={index}
            icon={icon}
            width="40"
            height="40"
            onClick={() => handleIconSelect(icon)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </Space>
    </div>
  );

  const getBackgroundColor = (index) => {
    const colors = ["#f5f5f5", "#e6f7ff", "#f6ffed", "#fff7e6", "#f9f0ff"];
    return colors[index % colors.length];
  };

  const updateMenu = (values) => {
    console.log(values, "values");
    const newMenu = values ? [values] : [];
    setMenu(newMenu);
  };

  return (
    <Wrapper>
      <div className="row">
        <div className="col-md-12 col-lg-9">
          <Card title="Menu" className="menu-card">
            <Form
              form={form}
              name="dynamic_form"
              onFinish={onFinish}
              autoComplete="off"
              onValuesChange={(_, allValues) => updateMenu(allValues)}
            >
              <Space
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item name="icon" label="Icon">
                  <Popover
                    content={iconContent}
                    title="Search Icons"
                    trigger="click"
                    visible={showPopover && currentChildIndex === null}
                    onVisibleChange={(visible) => setShowPopover(visible)}
                  >
                    <div className="icon-container" onClick={handleIconClick}>
                      <Icon
                        icon={selectedIcon || "mdi:add"}
                        width="30"
                        height="30"
                        style={{ cursor: "pointer", color: "black" }}
                      />
                    </div>
                  </Popover>
                </Form.Item>

                <Form.Item
                  name="path"
                  label="Path"
                  rules={[{ required: true, message: "Path is required" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="menuTitle"
                  label="Menu Title"
                  rules={[
                    { required: true, message: "Menu Title is required" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Space>

              <div
              // style={{ border: "1px dashed #ccc" }}
              >
                <Form.List name="children">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(
                        ({ key, name, fieldKey, ...restField }, index) => (
                          <Space
                            key={key}
                            className="submenu-item"
                            // style={{ backgroundColor: getBackgroundColor(index) }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              label="Icon"
                              name={[name, "icon"]}
                              fieldKey={[fieldKey, "icon"]}
                            >
                              <Popover
                                content={iconContent}
                                title="Search Icons"
                                trigger="click"
                                visible={
                                  showPopover && currentChildIndex === index
                                }
                                onVisibleChange={(visible) =>
                                  setShowPopover(visible)
                                }
                              >
                                <div
                                  className="icon-container"
                                  onClick={() => handleChildIconClick(index)}
                                >
                                  <Icon
                                    icon={selectedChildIcon[index] || "mdi:add"}
                                    width="30"
                                    height="30"
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>
                              </Popover>
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              label="Path"
                              name={[name, "path"]}
                              fieldKey={[fieldKey, "path"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Child path is required",
                                },
                              ]}
                            >
                              <Input placeholder="Child Path" />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              label="Menu Title"
                              name={[name, "menuTitle"]}
                              fieldKey={[fieldKey, "menuTitle"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Child menu title is required",
                                },
                              ]}
                            >
                              <Input placeholder="Child Menu Title" />
                            </Form.Item>

                            <MinusCircleOutlined
                              className="remove-icon"
                              onClick={() => remove(name)}
                            />
                          </Space>
                        )
                      )}
                      <div className="add-submenu-container">
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                            className="add-submenu-button"
                          >
                            {fields.length === 0
                              ? "add submenu"
                              : fields.length}
                          </Button>
                        </Form.Item>
                      </div>
                    </>
                  )}
                </Form.List>
              </div>

              <div className="form-footer">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Card>
        </div>
        <div className="col-md-12 col-lg-3">
          <Card title="Your Demo Menu" size="small" style={{ minHeight: 350 }}>
            {/* <Menu
              theme="light"
              mode="inline"
              // selectedKeys={[selectedKey]}
              items={[
                {
                  key: 1,
                  label: pathName,
                  icon: (
                    <Icon
                      Icon
                      icon={selectedIcon || "mdi:add"}
                      width="30"
                      height="30"
                      style={{
                        cursor: "pointer",
                        color: "black",
                      }}
                    />
                  ),
                  children: [
                    {
                      key: 2,
                      label: childPathName,
                      icon: (
                        <Icon
                          icon={selectedChildIcon[0] || "mdi:add"}
                          width="30"
                          height="30"
                          style={{ cursor: "pointer" }}
                        />
                      ),
                    },
                  ],
                },
              ]}
            /> */}

            <Menu
              theme="light"
              mode="inline"
              items={menu.map((item) => ({
                key: item.path,
                icon: <Icon icon={item.icon} />,
                label: item.menuTitle,
                children: item?.children
                  ? item?.children.map((child) => ({
                      key: child?.path,
                      icon: <Icon icon={child?.icon} />,
                      label: child?.menuTitle,
                    }))
                  : [],
              }))}
            />
          </Card>
        </div>
      </div>

      <Space
        direction="vertical"
        size="middle"
        form={form}
        style={{
          width: "50%",
        }}
      >
        {/* <Badge.Ribbon text="Forms" color="pink">
          <Card title="Without Date Value" size="small">
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              style={{
                maxWidth: 1400,
              }}
              onFieldsChange={validateFields}
            >
              <Form.Item
                name="file"
                label="Upload File"
                valuePropName="fileList"
                getValueFromEvent={(e) => e && e.fileList}
                rules={[
                  {
                    required: true,
                    message: "Please upload a file!",
                  },
                ]}
              >
                <Upload
                  name="file"
                  action={false ? "/api/upload" : null}
                  headers={{
                    authorization: "authorization-text",
                  }}
                >
                  <Button icon={<PlusOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                name={["user", "name"]}
                label="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "new", 0, "email"]}
                label="Email"
                rules={[
                  {
                    type: "email",
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["user", "new", 0, "age"]}
                label="Age"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    max: 9,
                    required: true,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item name={["user", "website"]} label="Website">
                <Input />
              </Form.Item>
              <Form.Item name={["user", "introduction"]} label="Introduction">
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  ...layout.wrapperCol,
                  offset: 8,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Badge.Ribbon> */}

        {/* <Badge.Ribbon text="Forms" color="pink">
          <Card title="With Date Value and Custom Range" size="small">
            <RangePickerComponent
              id="id------2222222"
              value={[filters2?.start_date, filters2?.end_date]}
              onChange={(e) => {
                console.log(e, "e");
                const filters_ = filters2;
                filters_.start_date = e?.[0];
                filters_.end_date = e?.[1];
                setFilters2({ ...filters_ });
              }}
              wantCustomRange={true}
              wantDateRange={true}
            />
          </Card>
        </Badge.Ribbon> */}
      </Space>
    </Wrapper>
  );
};

export default Forms;
