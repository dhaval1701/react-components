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
  Tabs,
  Drawer,
  Carousel,
  Collapse,
} from "antd";
import { Wrapper } from "./style";

const { TabPane } = Tabs;

const { Panel } = Collapse;

const totalReimbursed = {
  "Lost Warehouse": 5000,
  "Damaged Warehouse": 3000,
  "Lost Inbound": 2000,
  "Lost Outbound": 1000,
  "Disposed Of": 500,
  "Order Discrepancy": 2500,
  "Damaged Returns": 1800,
  "FBA Fee": 1500,
  "Wrong FNSKU Returned": 1000,
  "Disposition Change": 600,
  "Referral Fee": 800,
  "Cancelled Shipment Fee": 106.78,
};

// Example data for other tabs
const inProgressReimbursed = {
  "Lost Warehouse": 2500,
  "Damaged Warehouse": 1500,
  "Lost Inbound": 1000,
  "Lost Outbound": 500,
  "Disposed Of": 250,
  "Order Discrepancy": 1250,
  "Damaged Returns": 900,
  "FBA Fee": 750,
  "Wrong FNSKU Returned": 500,
  "Disposition Change": 300,
  "Referral Fee": 400,
  "Cancelled Shipment Fee": 53.39,
};

const submitReimbursed = {
  "Lost Warehouse": 1000,
  "Damaged Warehouse": 500,
  "Lost Inbound": 400,
  "Lost Outbound": 200,
  "Disposed Of": 100,
  "Order Discrepancy": 500,
  "Damaged Returns": 400,
  "FBA Fee": 300,
  "Wrong FNSKU Returned": 200,
  "Disposition Change": 120,
  "Referral Fee": 150,
  "Cancelled Shipment Fee": 26.7,
};

const contentStyle = {
  // margin: 0,
  padding: 2,
  height: "173px",
  color: "#000",
  // lineHeight: "160px",
  textAlign: "center",
  // background: "#364d79",
};

const StylePage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState(null);
  const [activeKey, setActiveKey] = useState("1");

  const [activePanel, setActivePanel] = useState(null); // State to track which panel is open
  // const [tableData, setTableData] = useState([]); // State to hold the data for the table
  const [columns, setColumns] = useState([]); // State to hold the columns for the table

  const tableColumns = [
    {
      title: "Column 1",
      dataIndex: "col1",
      key: "col1",
    },
    {
      title: "Column 2",
      dataIndex: "col2",
      key: "col2",
    },
    // Add more columns as required
  ];

  const tableData = [
    {
      key: "1",
      col1: "Data 1-1",
      col2: "Data 1-2",
    },
    {
      key: "2",
      col1: "Data 2-1",
      col2: "Data 2-2",
    },
    // Add more rows as required
  ];

  const showDrawer = (item) => {
    setDrawerData(item);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const data = [
    { title: "Total Reimbursed", values: totalReimbursed },
    { title: "In Progress Reimbursed", values: inProgressReimbursed },
    { title: "Submit Reimbursed", values: submitReimbursed },
  ];

  // Calculate total sum
  const totalSum = Object.values(inProgressReimbursed).reduce(
    (acc, value) => acc + value,
    0
  );

  // Function to calculate percentage
  const calculatePercentage = (value) => ((value / totalSum) * 100).toFixed(2);

  const renderList = (data) => (
    <div style={{ maxHeight: "375px", overflow: "auto" }}>
      <List
        size="small"
        bordered
        dataSource={Object.entries(data)}
        renderItem={([item, value]) => {
          const percentage = calculatePercentage(value);
          const isPositive = percentage >= 0;

          return (
            <div className="d-flex justify-content-between align-items-center mb-7 p-3">
              <div>
                <span className="text-muted fs-6 fw-semibold">{item}</span>
              </div>
              <div>
                <span className="text-gray-600 fs-7 fw-semibold">
                  ${value.toLocaleString()}
                </span>
                <span
                  className={`fw-semibold ms-2 ${
                    isPositive ? "text-success" : "text-danger"
                  }`}
                  style={{
                    fontSize: "12px",
                  }}
                >
                  ({percentage}%)
                </span>
              </div>
            </div>
          );
        }}
      />
    </div>
  );

  const handlePanelChange = (key, item) => {
    console.log("key", key);
    console.log("item", item);

    setActivePanel(key);

    // Here, you would set the table data and columns based on the clicked panel
    // Example: setting data and columns based on the item
    const data = item.tableData; // Replace with logic to fetch the actual table data
    const cols = [
      { title: "Column 1", dataIndex: "col1", key: "col1" },
      { title: "Column 2", dataIndex: "col2", key: "col2" },
    ]; // Replace with logic to fetch the actual columns

    // setTableData(data);
    setColumns(cols);
  };

  console.log("activePanel", activePanel);

  const dataAlert = [
    { title: "Signature Required", value: "4 Shipments" },
    { title: "POD & BOL Required", value: "4 Shipments" },
    { title: "Missing Dimensions", value: "5 FNSKU" },
    { title: "Payment Due", value: "0" },
    { title: "Payment Error", value: "0" },
    { title: "Permissions Error", value: "0" },
  ];

  return (
    <>
      <Wrapper>
        <div className="min-h-100" style={{ minHeight: "100vh" }}>
          <div className="card" style={{ marginBottom: "20px" }}>
            <div className="d-flex flex-wrap justify-content-around align-items-center p-4">
              {dataAlert.map((item, index) => (
                <div
                  key={index}
                  className="d-flex flex-column justify-content-start align-items-start align-items-xl-center mt-2 mt-xl-0 flex-sm-wrap px-5 custom-width"
                  style={{
                    // width: "220px",
                    borderRight: index === 5 ? "none" : "2px solid #E5E5E5",
                  }}
                >
                  <div className="text-muted fs-8 fw-semibold">
                    {item?.title}
                  </div>
                  <div className="text-gray-800 fs-6 fw-bold">
                    {item?.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="row gy-5 gx-xl-10">
            {/*begin::Col*/}
            <div className="col-xl-8 mb-5 mb-xl-10">
              <div className="row g-5 g-xl-10">
                {data.map(({ title, values }, index) => {
                  const totalAmount = Object.values(values).reduce(
                    (a, b) => a + b,
                    0
                  );
                  const percentageChange = Math.random() * 10 - 5; // Random percentage for demo purposes

                  return (
                    <div
                      className="col-md-6"
                      key={title}
                      onClick={() => setActiveKey(String(index + 1))}
                    >
                      <ReimbursementCard
                        title={title}
                        description="Refurbishment"
                        amount={totalAmount}
                        percentage={percentageChange.toFixed(2)}
                        index={index} // Pass the index here
                      />
                    </div>
                  );
                })}

                <div className="col-md-6">
                  <div className="card card-flush h-xl-100">
                    <h3 className="card-title align-items-start flex-column px-3 text-center">
                      <span className="card-label fs-6 fw-bold text-danger">
                        URGENT:ACTION REQUIRED
                      </span>
                    </h3>

                    <Carousel arrows infinite={false}>
                      {["first", "last"].map((sliceType, index) => (
                        <div key={index}>
                          <div style={contentStyle}>
                            {dataAlert
                              ?.slice(
                                sliceType === "first" ? 0 : -3,
                                sliceType === "first" ? 3 : undefined
                              )
                              ?.map((item) => (
                                <div
                                  key={item.id} // Ensure each item has a unique key
                                  className="d-flex justify-content-between align-items-center p-2"
                                >
                                  <div className="d-flex align-items-center">
                                    <div
                                      className="bullet rounded-2 bg-danger me-3"
                                      style={{
                                        background: "red",
                                        width: "6px",
                                        height: "6px",
                                      }}
                                    ></div>
                                    <span className="text-muted fs-6 fw-bold">
                                      {item.title}
                                    </span>
                                  </div>

                                  <div>
                                    <Button
                                      type="link"
                                      className="text-dark fs-6 fw-bold"
                                      onClick={() => showDrawer(item)}
                                      style={{
                                        padding: 0,
                                        border: "none",
                                        fontSize: "16px",
                                      }}
                                    >
                                      {item.value}
                                    </Button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </Carousel>

                    {/*begin::Body*/}
                    {/* <div className="card-body">
                    <List
                      itemLayout="horizontal"
                      dataSource={dataAlert}
                      renderItem={(item) => (
                        <>
                          <div
                            className="d-flex justify-content-between align-items-center p-2"
                            style={{ borderBottom: "1px dashed #ccc" }}
                          >
                            <div className="d-flex align-items-center">
                              <div
                                class="bullet rounded-2 bg-primary me-3"
                                style={{
                                  background: "red",
                                  width: "6px",
                                  height: "6px",
                                }}
                              ></div>
                              <span className="text-gray-800 fs-6 fw-bold">
                                {item.title}
                              </span>
                            </div>

                            <div>
                              <Button
                                type="link"
                                className="text-muted fs-6 fw-bold"
                                onClick={() => showDrawer(item)}
                                style={{
                                  padding: 0,
                                  border: "none",
                                  fontSize: "16px",
                                }}
                              >
                                {item.value}
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    />
                  </div> */}
                    {/*end::Body*/}
                  </div>
                </div>
              </div>
            </div>
            {/*end::Col*/}

            {/*begin::Col*/}
            <div className="col-xl-4 mb-xl-10">
              {/*begin::Engage widget 1*/}
              <div className="card" dir="ltr">
                {/*begin::Body*/}
                <div className="card-body ">
                  <Tabs
                    defaultActiveKey="1"
                    // type="card"
                    size="large"
                    activeKey={activeKey}
                    onChange={(e) => {
                      setActiveKey(e);
                    }}
                    tabBarStyle={{ paddingInline: "100px" }}
                  >
                    <TabPane tab="Total" key="1">
                      {renderList(totalReimbursed)}
                    </TabPane>
                    <TabPane tab="In Progress" key="2">
                      {renderList(inProgressReimbursed)}
                    </TabPane>
                    <TabPane tab="Submit" key="3">
                      {renderList(submitReimbursed)}
                    </TabPane>
                  </Tabs>
                </div>
                {/*end::Body*/}
              </div>
              {/*end::Engage widget 1*/}
            </div>
            {/*end::Col*/}
          </div>
        </div>

        <Drawer
          title={drawerData ? drawerData.title : ""}
          placement="right"
          onClose={closeDrawer}
          visible={drawerVisible}
        >
          <Table columns={tableColumns} dataSource={tableData} />
        </Drawer>

        <div className="min-h-100" style={{ minHeight: "100vh" }}>
          <div className="row g-5 g-xl-10">
            {data.map(({ title, values }, index) => {
              const totalAmount = Object.values(values).reduce(
                (a, b) => a + b,
                0
              );
              const percentageChange = Math.random() * 10 - 5; // Random percentage for demo purposes

              return (
                <div
                  className="col-md-4"
                  key={title}
                  onClick={() => setActiveKey(String(index + 1))}
                >
                  <ReimbursementCard
                    title={title}
                    description="Refurbishment"
                    amount={totalAmount}
                    percentage={percentageChange.toFixed(2)}
                    index={index} // Pass the index here
                  />
                </div>
              );
            })}
          </div>

          <div className="row g-5 g-xl-10 py-5">
            <div className="col-xl-6 mb-xl-10">
              <div className="card p-3">
                <Tabs
                  defaultActiveKey="1"
                  type="card"
                  size="large"
                  activeKey={activeKey}
                  onChange={(e) => {
                    setActiveKey(e);
                  }}
                >
                  <TabPane tab="Total" key="1">
                    {renderList(totalReimbursed)}
                  </TabPane>
                  <TabPane tab="In Progress" key="2">
                    {renderList(inProgressReimbursed)}
                  </TabPane>
                  <TabPane tab="Submit" key="3">
                    {renderList(submitReimbursed)}
                  </TabPane>
                </Tabs>
              </div>

              {/*end::Col*/}
            </div>

            <div className="col-xl-6 mb-xl-10">
              {/*begin::Table widget 9*/}
              <div className="card card-flush h-xl-100">
                <h3 className="card-title align-items-start flex-column px-3 text-center">
                  <span className="card-label fs-5 fw-bold text-danger">
                    URGENT:ACTION REQUIRED
                  </span>
                </h3>
                {/*begin::Body*/}
                <div className="card-body py-3" style={{ minHeight: "420px" }}>
                  <div className="table-container">
                    <div
                      className="table-header"
                      style={{
                        // background: "#F5F8FA",
                        padding: "20px",
                        display: "flex",
                      }}
                    >
                      <div
                        className="text-gray-500 fs-6 ms-4"
                        style={{ flex: 1 }}
                      >
                        Title
                      </div>
                      <div
                        className="text-gray-700 fs-6 ms-4"
                        style={{ flex: 1 }}
                      >
                        Value
                      </div>
                    </div>

                    {dataAlert.map((item, index) => (
                      <Collapse
                        activeKey={activePanel}
                        onChange={(e) => {
                          handlePanelChange(e[0], item);
                        }}
                        bordered={false}
                        key={index}
                      >
                        <Panel
                          header={
                            <div
                              className="table-row"
                              style={{
                                display: "flex",
                                padding: "10px",
                                borderBottom: "1px dashed #ccc",
                              }}
                            >
                              <div
                                className="text-muted fs-6 fw-bold"
                                style={{ flex: 1 }}
                              >
                                {item.title}
                              </div>
                              <div
                                className="text-gray-500 fs-6"
                                style={{ flex: 1 }}
                              >
                                {item.value}
                              </div>
                            </div>
                          }
                          key={String(index + 1)}
                        >
                          <div
                            className="table-content"
                            style={{ padding: "10px" }}
                          >
                            <div
                              className="table-header"
                              style={{
                                display: "flex",
                                borderBottom: "1px solid #ccc",
                                padding: "10px",
                              }}
                            >
                              {tableColumns.map((col) => (
                                <div
                                  key={col.key}
                                  style={{ flex: 1, fontWeight: "bold" }}
                                >
                                  {col.title}
                                </div>
                              ))}
                            </div>
                            {tableData.map((row, rowIndex) => (
                              <div
                                className="table-row"
                                key={rowIndex}
                                style={{
                                  display: "flex",
                                  borderBottom: "1px dashed #ccc",
                                  padding: "10px",
                                }}
                              >
                                <div style={{ flex: 1 }}>{row.col1}</div>
                                <div style={{ flex: 1 }}>{row.col2}</div>
                              </div>
                            ))}
                          </div>
                        </Panel>
                      </Collapse>
                    ))}
                  </div>
                  {/* <List
                  itemLayout="horizontal"
                  dataSource={dataAlert}
                  renderItem={(item) => (
                    <>
                      <div className="d-flex  justify-content-between align-items-center mb-7 p-2 border-bottom border-dashed">
                        <div>
                          <span className="text-gray-800 fs-6 fw-bold">
                            {item.title}
                          </span>
                        </div>
                        <div>
                          <span>{item.value}</span>
                        </div>
                      </div>
                    </>
                  )}
                /> */}
                </div>
                {/*end::Body*/}
              </div>
              {/*end::Table Widget 9*/}{" "}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default StylePage;

const ReimbursementCard = ({
  title,
  description,
  amount,
  percentage,
  index,
}) => (
  <div
    className="card card-flush"
    style={{
      background:
        index === 0
          ? "linear-gradient(to bottom right, black 80%, #ff8c00)"
          : "linear-gradient(to bottom right, white 80%, #ff8c00)",
      boxShadow:
        index === 0 ? "0px 14px 40px 0px rgba(24, 85, 243, 0.20)" : "none",
      padding: "10px",
    }}
  >
    <div className="card-header d-flex align-items-center pt-6">
      <div className="symbol symbol-50px me-4">
        <div
          className="symbol-label rounded-lg"
          // style={{ border: "1px dashed rgba(255, 255, 255, 0.20)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={58}
            fill={index === 0 ? "white" : "black"}
          >
            <path d="M5 20H19V22H5V20ZM12 18C7.58172 18 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 14.4183 16.4183 18 12 18ZM12 16C15.3137 16 18 13.3137 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 13.3137 8.68629 16 12 16Z"></path>
          </svg>
        </div>
      </div>
      <div className="card-title flex-column flex-grow-1">
        <div
          className={`card-label fw-bold fs-5 ${
            index === 0 ? "text-white" : ""
          }`}
        >
          {title}
        </div>
        <div
          className={`${
            index === 0 ? "text-white" : "text-dark"
          } opacity-50 fw-semibold fs-base`}
        >
          {description}
        </div>
      </div>
    </div>
    <div className="card-body d-flex align-items-end pb-3">
      <div className="d-flex flex-stack flex-row-fluid">
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center mb-1">
            <span
              className={`fw-bold me-2 ${
                index === 0 ? "text-white" : "text-dark"
              }`}
              style={{ fontSize: "2.5rem" }}
            >
              ${amount.toLocaleString()}
            </span>
            <span
              className={`fw-semibold ${
                percentage > 0 ? "text-success" : "text-danger"
              } fs-6`}
            >
              {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
            </span>
          </div>
          <span
            className={`fw-semibold ${
              index === 0 ? "text-white" : "text-dark"
            } opacity-50`}
          >
            For past 24 hours
          </span>
        </div>
      </div>
    </div>
  </div>
);
