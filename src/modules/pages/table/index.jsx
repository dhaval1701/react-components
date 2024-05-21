import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Wrapper } from "./style";
import { Badge, Card, Input, Space, Pagination, Table, message } from "antd";
import AntTable from "../../../components/ant-table";
import { MakeApiCall } from "../../../api";

const numberWithCommas = (x) => {
  if (x) {
    return x.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return x;
};

const AntDesignTable = () => {
  // const [filters, setFilters] = useState({
  //   searchVal: "",
  //   start_date: dayjs().add(-30, "d"),
  //   end_date: dayjs(),
  // });
  // const [tableData, setTableData] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [filters, setFilters] = useState({
    start_date: dayjs().add(-30, "d"),
    end_date: dayjs(),
  });

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
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
        // return <span>{e || "-"}</span>;
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
        console.log(e);
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

  const getFinanceList = async () => {
    const response = await MakeApiCall(
      `finance-data?page=${page || 1}&perPage=${pageSize || 10}&start_date=${
        dayjs(filters?.start_date).format("YYYY-MM-DD") || ""
      }&end_date=${dayjs(filters?.end_date)?.format("YYYY-MM-DD") || ""}`,
      "get",
      null,
      true
    );

    if (response?.status) {
      setTotalPage(response?.data?.pagination?.totalCount || 0);
      setList(response?.data?.records || []);
      setLoading(false);
    } else {
      setTotalPage(0);
      setList([]);
      setLoading(false);
      message.warning(response?.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    getFinanceList();
    return () => {};
  }, [page, pageSize, filters]);

  const callTable = () => {
    // Step 1: Select the element
    const callThisTable = document.getElementById("call-this-table");
    // Step 2: Trigger the click event
    callThisTable.click();
  };

  // Function to calculate the maximum length of e across all objects for a specific dataIndex
  const getMaxELength = (data, dataIndex) => {
    let maxLength = 0;
    data.forEach((item) => {
      const e = item[dataIndex];
      const length = e ? e.length : 0;
      if (length > maxLength) {
        maxLength = length;
      }
    });
    return maxLength;
  };

  const columnsWithWidth = columns.map((column) => {
    const { dataIndex } = column;

    // Calculate the maximum length of 'e' for the current dataIndex
    const maxELength = getMaxELength(list, dataIndex);

    // Calculate width based on the maximum length between dataIndex.length and maxELength
    const maxWidth = Math.max(dataIndex.length, maxELength);
    const width = maxWidth * 14; // Adjust multiplier as needed

    return { ...column, width };
  });

  return (
    <Wrapper>
      <Space
        direction="vertical"
        size="middle"
        style={{
          width: "100%",
        }}
      >
        {/* <Input
          size="large"
          placeholder="Search by name or email"
          prefix={<i className="ki-outline ki-magnifier fs-2 p-0" />}
          className="ant_search_input"
          value={filters?.searchVal}
          onChange={(e) => {
            setFilters({ ...filters, searchVal: e.target.value });
          }}
          onPressEnter={() => {
            callTable();
            setIsTableFlag(true);
          }}
        /> */}

        <Badge.Ribbon text="Table" color="pink">
          <Card title="With Date Value and Custom Range" size="small">
            {/* <Table
              id="table1"
              sticky={{ offsetHeader: 58 }}
              dataSource={list}
              // columns={columnsWithWidth}
              columns={columns}
              loading={loading}
              pagination={false}
              scroll={{ x: "max-content" }}
            /> */}
            <Table
              id="table2"
              // sticky={{ offsetHeader: 58 }}
              dataSource={list}
              // columns={columnsWithWidth}
              // showHeader={false}
              columns={columns}
              loading={loading}
              pagination={false}
              scroll={{ x: "max-content" }}
            />

            <div className="d-flex align-items-center justify-content-between mt-2">
              <div>
                {`Showing Rows ${numberWithCommas(
                  (page - 1) * pageSize + 1
                )} to  ${numberWithCommas(
                  page * pageSize > totalPage ? totalPage : page * pageSize
                )}  of ${numberWithCommas(totalPage)}`}
              </div>
              <Pagination
                className=" mb-0"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
                loading={loading || list?.length === 0}
                pageSize={pageSize}
                page={page}
                total={totalPage}
                onChange={(e) => {
                  setPage(e);
                }}
                onShowSizeChange={(_, v) => {
                  setPageSize(v);
                }}
              />
            </div>
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="Table" color="pink">
          <Card title="Without Date Value" size="small">
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
              callTableID="call-this-table"
              sorting={{ show: true, isApi: false }}
            ></AntTable> */}
          </Card>
        </Badge.Ribbon>

        <Badge.Ribbon text="Table" color="pink">
          <Card title="With Date Value and Custom Range" size="small">
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
          </Card>
        </Badge.Ribbon>
      </Space>
    </Wrapper>
  );
};

export default AntDesignTable;
