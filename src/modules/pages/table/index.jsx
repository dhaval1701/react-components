import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { Wrapper } from "./style";
import {
  Badge,
  Card,
  Input,
  Space,
  Pagination,
  Table,
  message,
  Button,
} from "antd";
import AntTable from "../../../components/ant-table";
import { MakeApiCall } from "../../../api";
import { OverflowText } from "../logs/center-logs";

const numberWithCommas = (x) => {
  if (x) {
    return x.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return x;
};

const data = [
  {
    performance_data: {
      "Charlee Bear": {
        2021: {
          sales: 320,
          units: 320,
          orders: 320,
          child_data: [],
        },
        2022: {
          sales: 10,
          units: 1323,
          orders: 110,
          child_data: [],
        },
        2023: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
        2024: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
      },
      "Canine Butcher Shop": {
        2023: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
        2024: {
          sales: 328767592.92,
          units: 4422,
          orders: 3886,
          child_data: [
            {
              brand_name: "Canine Butcher Shop",
              year: "2024",
              sku: "CBS-PIGEAR30",
              asin: "B07GSDZP36",
              image_url: "https://m.media-amazon.com/images/I/61nF1UAmTnL.jpg",
              product_name:
                "Canine Butcher Shop Pig Ears for Dogs, Always USA Made (30-Pack), All Natural, Sourced in USA Pig Ears, Digestible Pork Dog Chew Treat",
              orders: 1692,
              sales: 63156.51,
              units: "1905",
            },
            {
              brand_name: "Canine Butcher Shop",
              year: "2024",
              sku: "CBS-CHICKENFT60",
              asin: "B085ZRSLS2",
              image_url: "https://m.media-amazon.com/images/I/71xuEjtrnyL.jpg",
              product_name:
                "Canine Butcher Shop Chicken Feet Dog Treats, Raised & Made in USA (60-Pack), Dehydrated Chicken Feet, All Natural Dog Chews & Dog Snacks",
              orders: 2194,
              sales: 82818.61,
              units: "2517",
            },
          ],
        },
      },
      ZuPreem: {
        2023: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
        2024: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
      },
      Zerowater: {
        2023: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
        2024: {
          sales: 165095142.84,
          units: 2187,
          orders: 1911,
          child_data: [
            {
              brand_name: "Zerowater",
              year: "2024",
              sku: "H8-YB7X-8YVV",
              asin: "B008M4PYZW",
              image_url: "https://m.media-amazon.com/images/I/61Fs3HuaMOL.jpg",
              product_name:
                "Zerowater Replacement Filters for Pitchers (2 Pack)",
              orders: 1911,
              sales: 75489.32,
              units: "2187",
            },
          ],
        },
      },
      PoochPad: {
        2023: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
        2024: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
      },
      Cobalt: {
        2023: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
        2024: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
      },
      Culligan: {
        2023: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
        2024: {
          sales: 365803100.86,
          units: 4633,
          orders: 4001,
          child_data: [
            {
              brand_name: "Culligan",
              year: "2024",
              sku: "XZ-K3AX-BHFH",
              asin: "B08223KT82",
              image_url: "https://m.media-amazon.com/images/I/71cxmKj6uaL.jpg",
              product_name:
                "Culligan P5-4PK Standard P5 Whole House Premium Water Filter, 8,000 Gallons, Value 4-Pack, White, (Pack of 4), 4 Count",
              orders: 1993,
              sales: 79326.58,
              units: "2325",
            },
            {
              brand_name: "Culligan",
              year: "2024",
              sku: "XZ-K3AX-BHFH",
              asin: "B08223KT82",
              image_url: "https://m.media-amazon.com/images/I/71cxmKj6uaL.jpg",
              product_name:
                "Culligan P5-4PK Standard P5 Whole House Premium Water Filter, 8,000 Gallons, Value 4-Pack, White, (Pack of 4), 4 Count",
              orders: 2008,
              sales: 78582.67,
              units: "2308",
            },
          ],
        },
      },
      Fruitables: {
        2023: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
        2024: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
      },
      Fidobiotics: {
        2023: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
        2024: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
      },
      "Diggin' Your Dog": {
        2023: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
        2024: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
      },
      "Primal Pet Foods": {
        2023: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
        2024: {
          sales: 314717330.64,
          units: 4530,
          orders: 3974,
          child_data: [
            {
              brand_name: "Primal Pet Foods",
              year: "2024",
              sku: "PRIMAL2-DGCHICK5-B00BP2VEBQ",
              asin: "B00BP2VEBQ",
              image_url: "https://m.media-amazon.com/images/I/81z-v3Jj8BL.jpg",
              product_name:
                "Primal Freeze Dried Dog Food Nuggets, Chicken; Complete & Balanced Meal; Also Use as Topper or Treat; Premium, Healthy, Grain Free, High Protein Raw D",
              orders: 1903,
              sales: 68727.29,
              units: "2139",
            },
            {
              brand_name: "Primal Pet Foods",
              year: "2024",
              sku: "PRIMAL2-CTRABBIT5-B06XPVXJ7C",
              asin: "B06XPVXJ7C",
              image_url: "https://m.media-amazon.com/images/I/81a7mJdDd9L.jpg",
              product_name:
                "Primal Freeze Dried Cat Food Nuggets Rabbit; Complete & Balanced Meal or Topper; Premium, Healthy, Grain Free, High Protein Raw Cat Food with Probioti",
              orders: 1936,
              sales: 74800.33,
              units: "2230",
            },
            {
              brand_name: "Primal Pet Foods",
              year: "2024",
              sku: "PRIMAL3-DGBEEF5-B017A5EI2S",
              asin: "B017A5EI2S",
              image_url: "https://m.media-amazon.com/images/I/81vXFaY4DnL.jpg",
              product_name:
                "Primal Freeze Dried Dog Food Nuggets, Beef; Complete & Balanced Meal; Also Use as Topper or Treat; Premium, Healthy, Grain Free, High Protein Raw Dog",
              orders: 135,
              sales: 5620.63,
              units: "161",
            },
          ],
        },
      },
      "Pure Blue H2O": {
        2023: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
        2024: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
      },
      Sentrx: {
        2023: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
        2024: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
      },
      "Unknown Brand": {
        2023: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
        2024: {
          sales: 0,
          units: 0,
          orders: 0,
          child_data: [],
        },
      },
    },
    request_type: null,
  },
];
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
  const scrollableDivRef = useRef(null);
  const [sortingEnabled, setSortingEnabled] = useState(true);
  const [expand, setExpand] = useState(false);

  const [filters, setFilters] = useState({
    start_date: dayjs().add(-30, "d"),
    end_date: dayjs(),
  });

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortedInfo, setSortedInfo] = useState({});

  const newRender = (value, dataIndex) => {
    const minWidth = `${(dataIndex ? dataIndex.length : 1) * 8}px`;
    return (
      <div style={{ minWidth, position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            visibility: "hidden",
          }}
        >
          {dataIndex}
        </span>
        <span>{value || "-"}</span>
      </div>
    );
  };

  // const columns = [
  //   {
  //     title: "Account Type",
  //     dataIndex: "account_type",
  //     key: "account_type",
  //     render: (e) => newRender(e, "account_type"),
  //   },
  //   {
  //     title: "ASIN",
  //     dataIndex: "asin",
  //     key: "asin",
  //     render: (e) => newRender(e, "asin"),
  //   },
  //   {
  //     title: "Brand ID",
  //     dataIndex: "brand_id",
  //     key: "brand_id",
  //     render: (e) => newRender(e, "brand_id"),
  //   },
  //   {
  //     title: "Currency Code",
  //     dataIndex: "currency_code",
  //     key: "currency_code",
  //     render: (e) => newRender(e, "currency_code"),
  //   },
  //   {
  //     title: "Custom Brand ID",
  //     dataIndex: "custom_brand_id",
  //     key: "custom_brand_id",
  //     render: (e) => newRender(e, "custom_brand_id"),
  //   },
  //   {
  //     title: "Date Time",
  //     dataIndex: "date_time",
  //     key: "date_time",
  //     render: (e) => newRender(e, "date_time"),
  //   },
  //   {
  //     title: "Date Time (N)",
  //     dataIndex: "datetime_n",
  //     key: "datetime_n",
  //     render: (e) => newRender(e, "datetime_n"),
  //   },
  //   {
  //     title: "Description",
  //     dataIndex: "description",
  //     key: "description",
  //     render: (e) => newRender(e, "description"),
  //   },
  //   {
  //     title: "FBA Fees",
  //     dataIndex: "fba_fees",
  //     key: "fba_fees",
  //     render: (e) => newRender(e, "fba_fees"),
  //   },
  //   {
  //     title: "Fulfillment",
  //     dataIndex: "fulfillment",
  //     key: "fulfillment",
  //     render: (e) => newRender(e, "fulfillment"),
  //   },
  //   {
  //     title: "Gift Wrap Credits",
  //     dataIndex: "gift_wrap_credits",
  //     key: "gift_wrap_credits",
  //     render: (e) => newRender(e, "gift_wrap_credits"),
  //   },
  //   {
  //     title: "Giftwrap Credits Tax",
  //     dataIndex: "giftwrap_credits_tax",
  //     key: "giftwrap_credits_tax",
  //     render: (e) => newRender(e, "giftwrap_credits_tax"),
  //   },
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     key: "id",
  //     render: (e) => newRender(e, "id"),
  //   },
  //   {
  //     title: "Marketplace",
  //     dataIndex: "marketplace",
  //     key: "marketplace",
  //     render: (e) => newRender(e, "marketplace"),
  //   },
  //   {
  //     title: "Marketplace ID",
  //     dataIndex: "marketplace_id",
  //     key: "marketplace_id",
  //     render: (e) => newRender(e, "marketplace_id"),
  //   },
  //   {
  //     title: "Marketplace Withheld Tax",
  //     dataIndex: "marketplace_withheld_tax",
  //     key: "marketplace_withheld_tax",
  //     render: (e) => newRender(e, "marketplace_withheld_tax"),
  //   },
  //   {
  //     title: "Order City",
  //     dataIndex: "order_city",
  //     key: "order_city",
  //     render: (e) => newRender(e, "order_city"),
  //   },
  //   // {
  //   //   title: "Order Date",
  //   //   dataIndex: "order_date",
  //   //   key: "order_date",
  //   //   render: (e) => newRender(e, "order_date"),
  //   // },
  //   {
  //     title: "Order ID",
  //     dataIndex: "order_id",
  //     key: "order_id",
  //     render: (e) => newRender(e, "order_id"),
  //   },
  //   {
  //     title: "Order Postal",
  //     dataIndex: "order_postal",
  //     key: "order_postal",
  //     render: (e) => newRender(e, "order_postal"),
  //   },
  //   {
  //     title: "Order State",
  //     dataIndex: "order_state",
  //     key: "order_state",
  //     render: (e) => newRender(e, "order_state"),
  //   },
  //   {
  //     title: "Other",
  //     dataIndex: "other",
  //     key: "other",
  //     render: (e) => newRender(e, "other"),
  //   },
  //   {
  //     title: "Other Transaction Fees",
  //     dataIndex: "other_transaction_fees",
  //     key: "other_transaction_fees",
  //     render: (e) => newRender(e, "other_transaction_fees"),
  //   },
  //   {
  //     title: "Product Sales",
  //     dataIndex: "product_sales",
  //     key: "product_sales",
  //     render: (e) => newRender(e, "product_sales"),
  //   },
  //   {
  //     title: "Product Sales Tax",
  //     dataIndex: "product_sales_tax",
  //     key: "product_sales_tax",
  //     render: (e) => newRender(e, "product_sales_tax"),
  //   },
  //   {
  //     title: "Promotional Rebates",
  //     dataIndex: "promotional_rebates",
  //     key: "promotional_rebates",
  //     render: (e) => newRender(e, "promotional_rebates"),
  //   },
  //   {
  //     title: "Promotional Rebates Tax",
  //     dataIndex: "promotional_rebates_tax",
  //     key: "promotional_rebates_tax",
  //     render: (e) => newRender(e, "promotional_rebates_tax"),
  //   },
  //   {
  //     title: "Settlement ID",
  //     dataIndex: "settlement_id",
  //     key: "settlement_id",
  //     render: (e) => newRender(e, "settlement_id"),
  //   },
  //   {
  //     title: "Shipping Credits",
  //     dataIndex: "shipping_credits",
  //     key: "shipping_credits",
  //     render: (e) => newRender(e, "shipping_credits"),
  //   },
  //   {
  //     title: "Shipping Credits Tax",
  //     dataIndex: "shipping_credits_tax",
  //     key: "shipping_credits_tax",
  //     render: (e) => newRender(e, "shipping_credits_tax"),
  //   },
  //   {
  //     title: "SKU",
  //     dataIndex: "sku",
  //     key: "sku",
  //     render: (e) => newRender(e, "sku"),
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     render: (e) => newRender(e, "status"),
  //   },
  //   {
  //     title: "System Event Process ID",
  //     dataIndex: "system_event_process_id",
  //     key: "system_event_process_id",
  //     render: (e) => newRender(e, "system_event_process_id"),
  //   },
  //   {
  //     title: "Tax Collection Model",
  //     dataIndex: "tax_collection_model",
  //     key: "tax_collection_model",
  //     render: (e) => newRender(e, "tax_collection_model"),
  //   },
  //   {
  //     title: "TCS CGST",
  //     dataIndex: "tcs_cgst",
  //     key: "tcs_cgst",
  //     render: (e) => newRender(e, "tcs_cgst"),
  //   },
  //   {
  //     title: "TCS IGST",
  //     dataIndex: "tcs_igst",
  //     key: "tcs_igst",
  //     render: (e) => newRender(e, "tcs_igst"),
  //   },
  //   {
  //     title: "TCS SGST",
  //     dataIndex: "tcs_sgst",
  //     key: "tcs_sgst",
  //     render: (e) => newRender(e, "tcs_sgst"),
  //   },
  //   {
  //     title: "Total",
  //     dataIndex: "total",
  //     key: "total",
  //     render: (e) => newRender(e, "total"),
  //   },
  //   {
  //     title: "Total Sales Tax Liable",
  //     dataIndex: "total_sales_tax_liable",
  //     key: "total_sales_tax_liable",
  //     render: (e) => newRender(e, "total_sales_tax_liable"),
  //   },
  //   {
  //     title: "Type",
  //     dataIndex: "type",
  //     key: "type",
  //     render: (e) => newRender(e, "type"),
  //   },
  //   {
  //     title: "UTC Posted Date",
  //     dataIndex: "utc_posted_date",
  //     key: "utc_posted_date",
  //     render: (e) => newRender(e, "utc_posted_date"),
  //   },
  //   {
  //     title: "Vendor ID",
  //     dataIndex: "vendor_id",
  //     key: "vendor_id",
  //     render: (e) => newRender(e, "vendor_id"),
  //   },
  // ];

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

  // useEffect(() => {
  //   setLoading(true);
  //   getFinanceList();
  //   return () => {};
  // }, [page, pageSize, filters]);

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

  // const columnsWithWidth = columns.map((column) => {
  //   const { dataIndex } = column;

  //   // Calculate the maximum length of 'e' for the current dataIndex
  //   const maxELength = getMaxELength(list, dataIndex);

  //   // Calculate width based on the maximum length between dataIndex.length and maxELength
  //   const maxWidth = Math.max(dataIndex.length, maxELength);
  //   const width = maxWidth * 14; // Adjust multiplier as needed

  //   return { ...column, width };
  // });

  const dataSource = [
    {
      key: "1",
      name: "John Brown",
      age: 132,
      address: "New York No. 1 Lake Park",
      children: [
        {
          key: "1-1",
          name: "John Brown",
          age: 3,
          address: "New York No. 1 Lake Park",
        },
        {
          key: "1-2",
          name: "John Brown",
          age: 1,
          address: "New York No. 1 Lake Park",
        },
        {
          key: "1-3",
          name: "John Brown",
          age: 2,
          address: "New York No. 1 Lake Park",
        },
      ],
    },
    {
      key: "2",
      name: "John Brown",
      age: 69,
      address: "New York No. 1 Lake Park",
      children: [
        {
          key: "2-1",
          name: "John Brown",
          age: 22,
          address: "New York No. 1 Lake Park",
        },
        {
          key: "2-2",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
        },
      ],
    },

    {
      key: "3",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      children: [
        {
          key: "3-1",
          name: "John Brown",
          age: 52,
          address: "New York No. 1 Lake Park",
        },
        {
          key: "3-2",
          name: "John Brown",
          age: 42,
          address: "New York No. 1 Lake Park",
        },
      ],
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    console.log(sorter, "sorter");
    setSortedInfo(sorter);
  };

  const toggleSorting = () => {
    setSortingEnabled(!sortingEnabled);
    if (sortingEnabled) {
      setSortedInfo({});
    }
  };

  // Separate sorterFunction
  const sorterFunction = (a, b, order) => {
    const aAge = a?.children.reduce(
      (max, child) => Math.max(max, child.age),
      -Infinity
    );
    const bAge = b?.children.reduce(
      (max, child) => Math.max(max, child.age),
      -Infinity
    );

    if (order === "ascend") {
      return aAge - bAge;
    }
    return bAge - aAge;
  };

  console.log(sorterFunction(), "sorterFunction");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: {
        compare: (a, b) => {
          if (sortingEnabled) {
            // Perform comparison only if sorting is enabled and `children` is not true
            if (a?.children || b?.children) {
              return 0; // Skip comparison if either a or b has children
            }
            console.log(a, b, "compare");
            return a.age - b.age; // Example: Sorting by age in ascending order
          } else {
            // If sorting is not enabled, compare based on `age` if both have children
            if (a?.children && b?.children) {
              return a.age - b.age; // Example: Sorting by age in ascending order
            }
            return 0; // Skip comparison if one or neither has children
          }
        },
      },
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  const clearAll = () => {
    setSortedInfo({});
  };
  const performanceData = data[0].performance_data;

  // Assuming performanceData is your data source
  const years = Object.keys(
    performanceData[Object.keys(performanceData)[0]] || {}
  ).filter((key) => !isNaN(key));

  // Dynamically generate columns based on the years available
  const columns1 = [
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      width: 550,
      render: (text) => {
        try {
          const brandData = JSON.parse(text);

          return (
            <div className="d-flex justify-content-between align-items-center w-100">
              <img
                src={brandData.image_url}
                alt={brandData.product_name}
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
              <div style={{ width: "65%" }}>
                <OverflowText row={2} rule={true} placement={"bottom"}>
                  {brandData.product_name}
                </OverflowText>
              </div>

              <div>
                <p className="fw-bold">{brandData.asin}</p>
              </div>
            </div>
          );
        } catch (e) {
          return <span>{text}</span>;
        }
      },
    },
    ...years.map((year) => ({
      title: year,
      children: [
        {
          title: "Sales",
          dataIndex: `sales_${year}`,
          key: `sales_${year}`,
          render: (text) => <span>{text || "-"}</span>,
        },
        {
          title: "Units",
          dataIndex: `units_${year}`,
          key: `units_${year}`,
          render: (text) => <span>{text || "-"}</span>,
        },
        {
          title: "Orders",
          dataIndex: `orders_${year}`,
          key: `orders_${year}`,
          render: (text) => <span>{text || "-"}</span>,
        },
      ],
    })),
  ];

  // Prepare data source for Ant Design table
  const dataSource1 = Object.keys(performanceData).map((brand, i) => {
    const dataForBrand = performanceData[brand];

    // Extract dynamic child data for each year
    const years = Object.keys(dataForBrand);

    // Create the children array dynamically
    const children = years.flatMap((year) => {
      const childData = dataForBrand[year]?.child_data || [];
      return childData.map((item, index) => ({
        key: `${i + 1}-${index + 1}`,
        brand: JSON.stringify({
          brand_name: item.brand_name,
          year: item.year,
          sku: item.sku,
          asin: item.asin,
          image_url: item.image_url,
          product_name: item.product_name,
        }),
        [`sales_${year}`]: item.sales,
        [`units_${year}`]: item.units,
        [`orders_${year}`]: item.orders,
        year,
      }));
    });

    // Create the brand data object dynamically based on available years
    const brandData = {
      key: `${i + 1}`,
      brand,
      children, // Include dynamically created children
    };

    years.forEach((year) => {
      brandData[`sales_${year}`] = dataForBrand[year]?.sales || 0;
      brandData[`units_${year}`] = dataForBrand[year]?.units || 0;
      brandData[`orders_${year}`] = dataForBrand[year]?.orders || 0;
    });

    return brandData;
  });

  console.log(dataSource1, "dataSource1");

  return (
    <Wrapper>
      <Space
        direction="vertical"
        size="middle"
        style={{
          width: "100%",
        }}
      >
        <Table
          columns={columns1}
          dataSource={dataSource1}
          pagination={false}
          onExpand={(e) => {
            setExpand(e);
            console.log(e, "expand");
          }}
          scroll={{ x: expand ? "max-content" : "" }}
          // expandable={{}}
        />
      </Space>

      {/* <Space
        direction="vertical"
        size="middle"
        style={{
          width: "100%",
        }}
      >
        <Button onClick={toggleSorting} style={{ marginBottom: 16 }}>
          {sortingEnabled ? "Disable Sorting" : "Enable Sorting"}
        </Button>

        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>

        <Table
          columns={columns}
          dataSource={dataSource}
          expandable={{
            defaultExpandAllRows: true,
          }}
          onChange={handleChange}
        />
      </Space> */}

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
              // sticky={{ offsetHeader: 58 }}
              dataSource={[]}
              // columns={columnsWithWidth}
              columns={columns}
              loading={loading}
              pagination={false}
              scroll={{ x: "max-content" }}
            /> */}
            {/* <div ref={scrollableDivRef}>
              <Table
                id="table2"
                sticky={{ offsetHeader: 58 }}
                dataSource={list}
                // columns={columnsWithWidth}
                // showHeader={false}
                columns={columns}
                loading={loading}
                pagination={false}
                scroll={{ x: "max-content" }}
                // sticky={{ offsetHeader: 58, offsetScroll: 20 }}
              />
            </div> */}

            {/* <div className="d-flex align-items-center justify-content-between mt-2">
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
            </div> */}
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
