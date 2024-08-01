import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Input,
  List,
  Popconfirm,
  Skeleton,
  message,
  Button,
  Modal,
  Select,
  Table,
  Checkbox,
  Tag,
  Row,
  Col,
} from "antd";

const StylePage = () => {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      span: 23,
      //   offset: 12,
    },
    wrapperCol: {
      span: 23,
    },
  };

  const validateFields = () => {
    const fields = Object.keys(form.getFieldsValue());

    const hasError = fields.some(
      (field) =>
        !form.getFieldValue(field) || form.getFieldError(field).length != 0
    );

    // setButtonDisabled(hasError);
  };

  useEffect(() => {
    validateFields();
  }, []);

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        name="addSPUserCredentialForm"
        className="p-3 mt-5"
        layout="vertical"
        //   labelAlign="left"
        onFieldsChange={validateFields}
      >
        <Form.Item
          label="Company Name"
          name="company_name"
          rules={[
            {
              required: true,
              message: "Please input the Company name!",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(33% - 8px)", // Adjusted for spacing
            marginRight: "8px", // Add margin to create space between the two fields
          }}
        >
          <Input className="form-control fs-7" />
        </Form.Item>

        <Form.Item
          label="Seller Name"
          name="seller_name"
          rules={[
            {
              required: true,
              message: "Please input the Seller name!",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(66% - 8px)", // Adjusted for spacing
          }}
        >
          <Input className="form-control fs-7" />
        </Form.Item>

        {/* four items in one line */}
        <Form.Item
          label="Seller Name"
          name="seller_name"
          rules={[
            {
              required: true,
              message: "Please input the Seller name!",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(25% - 8px)", // Adjusted for spacing
          }}
        >
          <Input className="form-control fs-7" />
        </Form.Item>

        <Form.Item
          label="Seller Name"
          name="seller_name"
          rules={[
            {
              required: true,
              message: "Please input the Seller name!",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(25% - 8px)", // Adjusted for spacing
          }}
        >
          <Input className="form-control fs-7" />
        </Form.Item>

        <Form.Item
          label="Seller Name"
          name="seller_name"
          rules={[
            {
              required: true,
              message: "Please input the Seller name!",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(25% - 8px)", // Adjusted for spacing
          }}
        >
          <Input className="form-control fs-7" />
        </Form.Item>

        <Form.Item
          label="Seller Name"
          name="seller_name"
          rules={[
            {
              required: true,
              message: "Please input the Seller name!",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(25% - 8px)", // Adjusted for spacing
          }}
        >
          <Input className="form-control fs-7" />
        </Form.Item>

        <Form.Item
          label="Company Contact"
          name="contact_no"
          rules={[
            {
              pattern: /^[0-9]+$/,
              message:
                "Please enter a valid phone number (only numbers allowed).",
              required: true,
            },
            {
              min: 10,
              max: 10,
              message: "Contact must be maximum 10 characters long!",
              required: true,
            },
            {
              pattern: /^(?!\s+$).+/,
              message: "Contact cannot be only spaces",
              required: true,
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)", // Adjusted for spacing
            marginRight: "8px", // Add margin to create space between the two fields
          }}
        >
          <Input className="form-control fs-7" maxLength={10} />
        </Form.Item>

        <Form.Item
          label="Company Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid Company email!",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)", // Adjusted for spacing
          }}
        >
          <Input className="form-control fs-7" />
        </Form.Item>

        {/* <Form.Item
          label="PlateFroms"
          name="platforms"
          rules={[
            {
              required: true,
              message: "Please Select PlateFroms",
            },
          ]}
        >
          <Checkbox.Group options={allPlatform} />
        </Form.Item> */}

        <div>
          <p className="fs-6 mt-2 fw-bold text-gray-700">User Details:</p>{" "}
          {/* This is the label for the section */}
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please enter a First Name!",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)", // Adjusted for spacing
              marginRight: "8px", // Add margin to create space between the two fields
            }}
          >
            <Input className="form-control fs-7" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please enter a Last Name!",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)", // Adjusted for spacing
            }}
          >
            <Input className="form-control fs-7" />
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default StylePage;
