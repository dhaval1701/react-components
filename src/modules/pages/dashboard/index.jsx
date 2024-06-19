import React, { useContext, useEffect, useRef, useState } from "react";

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DotChartOutlined,
  MailOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Table,
  Tag,
  Tooltip,
  message,
  Card,
  Select,
  DatePicker,
  Space,
  theme,
  Button,
} from "antd";
import dayjs from "dayjs";
import AntButton from "../../../components/ant-button";
import AntSkeleton from "../../../components/ant-skeleton";
import AntTable from "../../../components/ant-table";
import processValue from "../../../components/marketplace-value";
import AntEmpty from "../../../components/ant-nodata";
import NoData from "../../../components/ant-nodata";
import { Wrapper } from "./style";
import AntDropdown from "../../../components/ant-dropdown";
import ColorShades from "../../../components/colorShades";
import { generate, presetPalettes } from "@ant-design/colors";
import RangePickerComponent from "../../../components/ant-rangepicker";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../commonContext";

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({
    start_date: dayjs().add(-30, "d"),
    end_date: dayjs(),
  });
  const [selectedValues, setSelectedValues] = useState(["a10", "c12"]);
  const [tempSelectedValues, setTempSelectedValues] = useState([]);
  const [applyClick, setApplyClick] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const selectRef = useRef(null);
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const { data, updateCommonGlobalVal } = useContext(GlobalContext);

  const columns = [
    {
      title: "Account Type",
      dataIndex: "account_type",
      key: "account_type",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "ASIN",
      dataIndex: "asin",
      key: "asin",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Brand ID",
      dataIndex: "brand_id",
      key: "brand_id",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },

    {
      title: "Currency Code",
      dataIndex: "currency_code",
      key: "currency_code",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Custom Brand ID",
      dataIndex: "custom_brand_id",
      key: "custom_brand_id",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Date Time",
      dataIndex: "date_time",
      key: "date_time",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Date Time (N)",
      dataIndex: "datetime_n",
      key: "datetime_n",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "FBA Fees",
      dataIndex: "fba_fees",
      key: "fba_fees",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Fulfillment",
      dataIndex: "fulfillment",
      key: "fulfillment",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Gift Wrap Credits",
      dataIndex: "gift_wrap_credits",
      key: "gift_wrap_credits",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Giftwrap Credits Tax",
      dataIndex: "giftwrap_credits_tax",
      key: "giftwrap_credits_tax",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Marketplace",
      dataIndex: "marketplace",
      key: "marketplace",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Marketplace ID",
      dataIndex: "marketplace_id",
      key: "marketplace_id",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Marketplace Withheld Tax",
      dataIndex: "marketplace_withheld_tax",
      key: "marketplace_withheld_tax",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Order City",
      dataIndex: "order_city",
      key: "order_city",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    // {
    //   title: "Order Date",
    //   dataIndex: "order_date",
    //   key: "order_date",
    //   render: (e) => {
    //     return <span>{e || "-"}</span>;
    //   },
    // },
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Order Postal",
      dataIndex: "order_postal",
      key: "order_postal",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Order State",
      dataIndex: "order_state",
      key: "order_state",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Other",
      dataIndex: "other",
      key: "other",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Other Transaction Fees",
      dataIndex: "other_transaction_fees",
      key: "other_transaction_fees",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Product Sales",
      dataIndex: "product_sales",
      key: "product_sales",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Product Sales Tax",
      dataIndex: "product_sales_tax",
      key: "product_sales_tax",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Promotional Rebates",
      dataIndex: "promotional_rebates",
      key: "promotional_rebates",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Promotional Rebates Tax",
      dataIndex: "promotional_rebates_tax",
      key: "promotional_rebates_tax",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Settlement ID",
      dataIndex: "settlement_id",
      key: "settlement_id",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Shipping Credits",
      dataIndex: "shipping_credits",
      key: "shipping_credits",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Shipping Credits Tax",
      dataIndex: "shipping_credits_tax",
      key: "shipping_credits_tax",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "System Event Process ID",
      dataIndex: "system_event_process_id",
      key: "system_event_process_id",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Tax Collection Model",
      dataIndex: "tax_collection_model",
      key: "tax_collection_model",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "TCS CGST",
      dataIndex: "tcs_cgst",
      key: "tcs_cgst",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "TCS IGST",
      dataIndex: "tcs_igst",
      key: "tcs_igst",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "TCS SGST",
      dataIndex: "tcs_sgst",
      key: "tcs_sgst",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Total Sales Tax Liable",
      dataIndex: "total_sales_tax_liable",
      key: "total_sales_tax_liable",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "UTC Posted Date",
      dataIndex: "utc_posted_date",
      key: "utc_posted_date",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
    {
      title: "Vendor ID",
      dataIndex: "vendor_id",
      key: "vendor_id",
      render: (e) => {
        return <span>{e || "-"}</span>;
      },
    },
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const customIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="340" height="340" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M11 15h2v2h-2zm0-8h2v6h-2zm1 10a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7h4zm9.7-10.29a1 1 0 0 0-1.41 0L18 5.59V3a1 1 0 0 0-2 0v2.59l-1.29-1.3a1 1 0 0 0-1.41 1.41L15.59 7H13a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V10a3 3 0 0 0-3-3h-2.59l1.3-1.29a1 1 0 0 0 0-1.42z"/>
    </svg>
  `;
  const handleSelectChange = (values) => {
    setSelectedValues((prev) => {
      // setTempSelectedValues([...selectedValues]);
      return [...prev, values];
    });
    // setSelectedValues([...selectedValues, values]);
    // setTempSelectedValues([...selectedValues, values]);
  };

  const handleDeselectChange = (valueToRemove) => {
    setSelectedValues((prev) => {
      // Filter out the valueToRemove from the previous state array
      const updatedValues = prev.filter((value) => value !== valueToRemove);
      // // Update tempSelectedValues with the updatedValues
      // setTempSelectedValues(updatedValues);
      // Return the updatedValues as the new state value
      return updatedValues;
    });
  };

  const applyChanges = () => {
    setApplyClick(true);
    // console.log(tempSelectedValues, "temp value");
    setTempSelectedValues(selectedValues);
    // setSelectedValues([...selectedValues, tempSelectedValues]);
    setSelectOpen(false);
  };

  console.log(tempSelectedValues, "temp values");
  console.log(selectedValues, "select values");
  const handleCancel = () => {
    setSelectedValues(tempSelectedValues);
    setSelectOpen(false);
  };

  // useEffect(() => {
  //   const handleDocumentClick = (e) => {
  //     // Your code to be executed when the document is clicked
  //     console.log("Document clicked!", e);
  //     setSelectOpen(true);
  //     // You can access the clicked element using event.target
  //   };

  //   document.addEventListener("click", handleDocumentClick);

  //   return () => {
  //     document.removeEventListener("click", handleDocumentClick);
  //   };
  // }, []);

  // useEffect(() => {
  //   const rootElement = document.getElementById("root");

  //   const handleMouseDown = (event) => {
  //     // Check if the click originated from within the root element (or its children)
  //     if (rootElement.contains(event.target)) {
  //       event.preventDefault(); // Prevent default click behavior
  //       event.stopPropagation();
  //       // Add your custom logic here for handling the mousedown event on the root element
  //       console.log("Mouse down on root element or its children!");
  //     }
  //   };

  //   // Add event listener for mousedown on the document
  //   document.addEventListener("mousedown", handleMouseDown);

  //   // Cleanup function to remove the event listener
  //   return () => {
  //     document.removeEventListener("mousedown", handleMouseDown);
  //   };
  // }, []);

  // useEffect(() => {
  //   function handleClickAway(event) {
  //     if (selectRef.current && !selectRef.current.contains(event.target)) {
  //       alert("Clicked outside product 1");
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickAway);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickAway);
  //   };
  // }, [selectRef]);

  const handleDropdownVisibleChange = (valueToRemove) => {
    setTempSelectedValues(selectedValues);
    setSelectOpen(true);
  };

  const users = [
    { id: 1, name: "User One", userType: 1 },
    { id: 2, name: "User Two", userType: 2 },
    // Add more users as needed
  ];

  const updateUserTypeInLocalStorage = (newType) => {
    localStorage.setItem("userType", newType);
    updateCommonGlobalVal("userType_", newType);
    const event = new Event("userTypeChanged");
    window.dispatchEvent(event);
  };

  const switchUserType = (userType) => {
    updateUserTypeInLocalStorage(userType);
    navigate("/cards"); // Reload the page to apply new routes
  };

  console.log("enter");
  return (
    <Wrapper ref={selectRef}>
      <div className="section">
        <div>
          <h2>User List</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} (Type: {user.userType})
                <button onClick={() => switchUserType(2)}>
                  Switch to User Type 2
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="section">
        <Select
          id="first-select"
          onDropdownVisibleChange={handleDropdownVisibleChange}
          open={selectOpen}
          // onSelect={() => setSelectOpen(true)}
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          value={selectedValues}
          onSelect={handleSelectChange}
          onDeselect={handleDeselectChange}
          options={options}
          dropdownRender={(menu) => (
            <div>
              {menu}
              <div style={{ padding: "8px", borderTop: "1px solid #e8e8e8" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}
                >
                  <Button type="primary" onClick={applyChanges}>
                    Apply
                  </Button>
                  <Button onClick={handleCancel}>Close</Button>
                </div>
              </div>
            </div>
          )}
        />
      </div>
      <div className="section ">
        <RangePickerComponent
          // id="asin_dashboard_filter_range_picker"
          value={[filters?.start_date, filters?.end_date]}
          onChange={(e) => {
            console.log(e, "e");
            const filters_ = filters;
            filters_.start_date = e?.[0];
            filters_.end_date = e?.[1];
            setFilters({ ...filters_ });
          }}
          wantCustomRange={true}
          wantDateRange={false}
        />
      </div>
      <div className="section mt-5">
        <div className="col-12 mt-5">
          <div className="row">
            <div className="col-sm-6 col-lg-6 col-xl-2">
              <Card className="custom-card">
                <div className="custom-card-inner">
                  <div className="custom-card-front">
                    <div className="d-flex justify-content-start align-items-start h6">
                      Number 1
                    </div>

                    <div className="d-flex justify-content-end align-items-end">
                      {processValue(
                        "23.322",
                        "TR",
                        "%",
                        true,
                        {
                          width: 16,
                          height: 16,
                          color: "red",
                          borderRadius: "2px",
                        },
                        { fontSize: "25px" },
                        "left"
                      )}
                    </div>
                  </div>

                  <div className="custom-card-back">
                    <p>This is example of percentage</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="col-sm-6 col-lg-6 col-xl-2">
              <Card>
                <div className="d-flex justify-content-center align-items-center h6">
                  Number 2
                </div>

                <div className="d-flex justify-content-center align-items-center ">
                  {processValue(
                    3023.33,
                    "FR",
                    "£",
                    true,
                    {
                      color: "green",
                      borderRadius: "2px",
                    },
                    { color: "", fontWeight: "bold", fontSize: "25px" }
                  )}
                </div>
              </Card>
            </div>

            <div className="col-sm-6 col-lg-6 col-xl-2">
              <Card className="custom-card">
                <div className="d-flex justify-content-end align-items-center h6">
                  Number 3
                </div>

                <div className="d-flex justify-content-start align-items-center ">
                  {processValue(
                    1234.56,
                    "IT",
                    "£",
                    true,
                    {
                      width: 16,
                      height: 16,
                      color: "red",
                      borderRadius: "2px",
                    },
                    { fontSize: "25px" },
                    false
                  )}
                </div>
              </Card>
            </div>

            <div className="col-sm-6 col-lg-6 col-xl-2">
              <Card className="text-center">
                <div className="d-flex justify-content-end align-items-center h6">
                  Number Custom
                </div>

                <div className="d-flex justify-content-start align-items-center ">
                  {processValue(
                    -43437.912,
                    "USA",
                    "$",
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5.5C7.86.5 5.5 2.86 5.5 6c0 1.57.62 3.07 1.74 4.19L12 21.19l4.76-4.76L17.5 10c1.12-1.12 1.74-2.62 1.74-4.19 0-3.14-2.36-5.5-5.5-5.5zm3.5 8.09L12 18.59l-3.5-3.5A3.978 3.978 0 0 1 5.5 6c0-.56.11-1.09.31-1.59L12 13.42l4.19-4.19c.2.5.31 1.03.31 1.59 0 1.71-.79 3.27-2.09 4.5z" />
                    </svg>,
                    {},
                    { fontSize: "25px" }
                  )}
                </div>
              </Card>
            </div>

            {/* <div className="col-sm-6 col-lg-6 col-xl-4">
              <Card>
                <AntDropdown
                  width={320}
                  apiProps={{
                    endpoint: "endpoint.com",
                    keyName: ["documents", "images"],
                  }}
                  showList={true}
                  closeDropdown={false}
                ></AntDropdown>
              </Card>
            </div> */}
          </div>
        </div>

        <div className="col-12 mt-5">
          <div className="row">
            <div className="col-sm-6 col-lg-6 col-xl-2">
              <div
                className="card1"
                style={{ backgroundColor: token.colorBgContainer }}
              >
                <div className="d-flex flex-column justify-content-center align-items-end p-3">
                  <div>
                    {processValue(
                      "23.322",
                      "TR",
                      "%",
                      true,
                      {
                        width: 16,
                        height: 16,
                        color: "red",
                        borderRadius: "2px",
                      },
                      { fontSize: "25px" },
                      "left"
                    )}
                  </div>

                  <div
                    className=""
                    style={{
                      color: "#6c757d",
                      fontSize: "13px",
                      fontWeight: 700,
                      letterSpacing: "0.7px",
                    }}
                  >
                    PERCENTAGE
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-6 col-xl-4">
              <div
                className="card1"
                style={{ backgroundColor: token.colorBgContainer }}
              >
                <div className="position-relative overflow-hidden">
                  <div
                    className="d-flex  justify-content-end align-items-start p-3"
                    style={{
                      color: "#6c757d",
                      fontSize: "13px",
                      fontWeight: 700,
                      letterSpacing: "0.7px",
                    }}
                  >
                    CURRENCY
                  </div>

                  <div className="text-center pb-5 pt-3">
                    <div>
                      {processValue(
                        3023.33,
                        "FR",
                        "£",
                        true,
                        {
                          color: "green",
                          borderRadius: "2px",
                        },
                        { fontWeight: "bold", fontSize: "25px" }
                      )}
                    </div>
                  </div>

                  <div className="position-absolute badge" style={{}}>
                    This is badge
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-6 col-xl-2">
              <div
                className="card1"
                style={{ backgroundColor: token.colorBgContainer }}
              >
                <div className="py-5 text-center">
                  <div className="">
                    {processValue(
                      1234.56,
                      "IT",
                      "£",
                      true,
                      {
                        width: 16,
                        height: 16,
                        color: "red",
                        borderRadius: "2px",
                      },
                      { fontSize: "25px" },
                      false
                    )}
                  </div>

                  <div
                    style={{
                      color: "#6c757d",
                      fontSize: "13px",
                      fontWeight: 700,
                      letterSpacing: "0.7px",
                    }}
                  >
                    CURRENCY
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-6 col-xl-2">
              <div
                className="card1"
                style={{ backgroundColor: token.colorBgContainer }}
              >
                <div
                  className="text-center"
                  style={{
                    backgroundColor: token.colorFillSecondary,
                    padding: "5px",
                  }}
                >
                  <p>Number Custom</p>
                </div>

                <div className="d-flex justify-content-center align-items-center p-3">
                  {processValue(
                    -43437.912,
                    "USA",
                    "$",
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5.5C7.86.5 5.5 2.86 5.5 6c0 1.57.62 3.07 1.74 4.19L12 21.19l4.76-4.76L17.5 10c1.12-1.12 1.74-2.62 1.74-4.19 0-3.14-2.36-5.5-5.5-5.5zm3.5 8.09L12 18.59l-3.5-3.5A3.978 3.978 0 0 1 5.5 6c0-.56.11-1.09.31-1.59L12 13.42l4.19-4.19c.2.5.31 1.03.31 1.59 0 1.71-.79 3.27-2.09 4.5z" />
                    </svg>,
                    {},
                    { fontSize: "25px" }
                  )}
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-6 col-xl-2">
              <Card>
                <AntDropdown
                  width={320}
                  apiProps={{
                    endpoint: "endpoint.com",
                    keyName: ["documents", "images"],
                  }}
                  showList={true}
                  closeDropdown={false}
                ></AntDropdown>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="section">
        <Space direction="horizontal">
          <Select
            defaultValue="lucy"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
              {
                value: "disabled",
                label: "Disabled",
                disabled: true,
              },
            ]}
          />
          <DatePicker onChange={onChange} />
        </Space>
      </div> */}

      <div className="section mt-5">
        {/* <AntTable
          columns={columns}
          showPagination={true}
          apiProps={{
            endpoint: "finance-data",
            dataLocation: "data.?records",
            paginationLocation: "data?.pagination?",
            filters: {
              // search: "testData",
              // startDate: filters?.start_date,
              // endDate: filters?.end_date,
            },
            method: "get",
          }}
          paginationProps={{ page: "page", size: "perPage" }}
          setTableData={setTableData}
          scroll={{
            x: "max-content",
          }}
          sticky={true}
          sorting={{ show: true, isApi: false }}
        ></AntTable> */}
        {/* <AntTable
        columns={columns}
        showPagination={true}
        apiProps={{
          endpoint: "coupon-performance-data",
          // filters: {
          //   startDate: filters?.start_date,
          //   endDate: filters?.end_date,
          // },
          method: "get",
        }}
        paginationProps={{ page: "page", size: "perPage" }}
        getData={getData}
        scroll={{
          x: "max-content",
        }}
        sticky={true}
      ></AntTable> */}
      </div>

      {/* <div className="section">
        <div>
          <NoData
            type="404"
            customMessage="No data found."
            isButton={true}
            onButtonClick={() => alert("Button clicked!")}
            customIcon={customIcon} // Custom SVG icon as string
            buttonName="Retry" // Custom button name
          />
        </div>
      </div> */}

      {/* <div className="section d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-around flex-wrap">
          <AntButton shape="circle" variant="fill" color="blue">
            Click Me
          </AntButton>
          <AntButton
            type="text"
            shape="rectangle"
            variant="outline"
            color="#ffc107"
          >
            Click Me
          </AntButton>
          <AntButton
            shape="rectangle"
            size="sm"
            variant="fill"
            color="red"
            hoverEffect="grow"
            onClick={() => console.log("Button clicked")}
          >
            Click Me
          </AntButton>
          <AntSkeleton
            height={144}
            width={144}
            shape={"circle"}
            active
          ></AntSkeleton>
        </div>
      </div> */}
    </Wrapper>
  );
};

export default Dashboard;
