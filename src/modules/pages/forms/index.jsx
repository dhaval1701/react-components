import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Wrapper } from "./style";
import {
  Badge,
  Card,
  Form,
  Space,
  Button,
  Input,
  InputNumber,
  Upload,
} from "antd";

const Forms = () => {
  const [form] = Form.useForm();
  const [isButtonDisabled, setButtonDisabled] = useState(true);

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

  const onFinish = async (values) => {
    const { file, user } = values;

    console.log(file, "file");
    // Check if there's a file uploaded
    if (file && file.length > 0 && file[0].originFileObj) {
      const formData = new FormData();
      formData.append("file", file[0].originFileObj);

      console.log(formData, "formdata");
      try {
        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        const response = await fetch("YOUR_API_ENDPOINT", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        // Handle the response data
        console.log(data);
      } catch (error) {
        console.error("Error uploading the file:", error);
      }
    }

    // Handle other form fields like user
    console.log(user);
  };

  const validateFields = () => {
    const fields = Object.keys(form.getFieldsValue());

    const hasError = fields.some(
      (field) =>
        !form.getFieldValue(field) || form.getFieldError(field).length != 0
    );

    setButtonDisabled(hasError);
  };

  return (
    <Wrapper>
      <Space
        direction="vertical"
        size="middle"
        form={form}
        style={{
          width: "100%",
        }}
      >
        <Badge.Ribbon text="Forms" color="pink">
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
        </Badge.Ribbon>

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
