import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import Pagination from "./lib/pagination";
import { ConvertParams, extractData } from "../common-functions";
import { MakeApiCall } from "../../api";

const AntTable = ({
  columns,
  showPagination,
  setTableData,
  apiProps,
  paginationProps,
  sorting,
  callTableID,
  ...restProps
}) => {
  const [data, setData] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortFilters, setSortFilters] = useState({
    key: "",
    type: "",
  });

  const {
    endpoint,
    dataLocation,
    paginationLocation,
    filters = {},
    method,
  } = apiProps;

  const { page: pageApiName, size: pageSizeApiName } = paginationProps;

  const { show, isApi } = sorting;

  const getTableList = async (apiObj) => {
    // Construct query parameters
    const queryParams = ConvertParams({
      [pageApiName]: page || 1,
      [pageSizeApiName]: pageSize || 10,
      ...filters,
    });

    // Make API call with constructed query parameters
    const response = await MakeApiCall(
      `${endpoint}${queryParams}`,
      apiObj ? "post" : method,
      apiObj ? apiObj : null,
      true
    );

    if (response?.status) {
      const responseData = extractData(response, dataLocation);
      const paginationData = extractData(response, paginationLocation);
      setData(responseData || []);
      setTableData(response || []);
      setTotalPage(paginationData?.totalCount || 0);
      setListLoading(false);
    } else {
      message.warning(response?.message);
      setListLoading(false);
    }
  };

  useEffect(() => {
    setListLoading(true);
    getTableList();
  }, [page, pageSize]);

  const handlePerPageChange = (pageSize, page) => {
    setPageSize(pageSize);
    setPage(page);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  function clickHandler(event) {
    setListLoading(true);
    getTableList();
  }

  useEffect(() => {
    if (callTableID) {
      // Step 1: Select the element
      const callThisTable = document.getElementById(callTableID);
      // Step 2: Attach the click event listener
      callThisTable.addEventListener("click", clickHandler);
      return () => {
        // Step 3: Remove the click event listener
        callThisTable.removeEventListener("click", clickHandler);
      };
    }
  }, []);

  const maxLengths = {};
  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      const dataIndexLength = key.length;
      const dataItemLength = String(item[key]).length;
      const maxLength = Math.max(dataIndexLength, dataItemLength);

      if (!maxLengths[key] || maxLengths[key] < maxLength) {
        maxLengths[key] = maxLength;
      }
    });
  });

  const updatedColumns =
    show && !isApi
      ? columns.map((column) => {
          const { dataIndex } = column;
          const width = column.width || maxLengths[dataIndex] * 14;

          // Extract the data of the first row for this column
          const firstRowData = data.length > 0 ? data[0][dataIndex] : null;

          // Check if the data in the column is numeric or not
          const isNumeric =
            !isNaN(parseFloat(firstRowData)) && isFinite(firstRowData);

          // Define sorter based on whether the data is numeric or not
          const sorter =
            show && !isApi && isNumeric
              ? {
                  compare: (a, b) => {
                    // Add null check here
                    if (a[dataIndex] === null || b[dataIndex] === null) {
                      return 0; // or any default value you want to use
                    }
                    return a[dataIndex] - b[dataIndex];
                  },
                }
              : {
                  compare: (a, b) => {
                    // Add null check here
                    if (a[dataIndex] === null || b[dataIndex] === null) {
                      return 0; // or any default value you want to use
                    }
                    return a[dataIndex].localeCompare(b[dataIndex]);
                  },
                };

          return { ...column, width, sorter: { ...sorter } };
        })
      : columns;

  const extraProps = (type) => {
    if (type) {
      return {
        defaultSortOrder: type === sortFilters?.key ? sortFilters.type : [],
        sorter: () => {},
      };
    }
  };

  const updateColumnsApi = isApi
    ? columns.map((column) => {
        const { dataIndex } = column;
        const width = column.width || maxLengths[dataIndex] * 14;

        return { ...column, width, ...extraProps(column?.isFilterKey) };
      })
    : columns;

  const handleTableChange = (pagination, filters, sorter) => {
    setSortFilters({
      key: sorter.order ? sorter.column.isFilterKey : "", // Update key only if order is present
      type: sorter.order || "", // Update type with the order
    });

    const apiObj = {
      page: 1,
      perPage: pageSize,
      sort:
        sorter?.order === "ascend"
          ? sorter?.column?.isFilterKey
          : `-${sorter?.column?.isFilterKey}`,
    };

    setListLoading(true);
    getTableList(apiObj);
  };

  return (
    <div>
      <Table
        loading={listLoading}
        columns={isApi ? updateColumnsApi : updatedColumns}
        dataSource={data}
        pagination={false}
        onChange={isApi ? handleTableChange : null}
        {...restProps}
      />
      {showPagination && (
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <Pagination
            loading={listLoading || data.length === 0}
            pageSize={pageSize}
            page={page}
            totalPage={totalPage}
            onPerPage={handlePerPageChange}
            onPageNo={handlePageChange}
          />
        </div>
      )}
      <span style={{ visibility: "hidden" }} id={callTableID}></span>
    </div>
  );
};

export default AntTable;
