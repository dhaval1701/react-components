import { Pagination, Select } from "antd";
import React, { useEffect, useState } from "react";
// import { DefaultPerPage, pageDropdown } from "../../config";
import Wrapper from "./style";
export default function (props) {
  const {
    pageSize = 10,
    onPerPage,
    page = 1,
    totalPage = 10,
    onPageNo,
    loading,
    ...rest
  } = props;
  if (loading) return;
  const [size, setSize] = useState(false);
  const DefaultPerPage = 10;
  const pageSizeOptions = [10, 20, 30];
  const numberWithCommas = (x) => {
    if (x) {
      if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // return x.toLocaleString();
      }
      return x;
    }
    return x;
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(
        document?.getElementsByClassName("paginationSize")?.[0]?.offsetWidth <=
          650
      );
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);
  useEffect(() => {
    if (!loading) {
      setSize(
        document?.getElementsByClassName("paginationSize")?.[0]?.offsetWidth <=
          650
      );
    }
  }, [loading]);
  // window.innerWidth >= 992
  return (
    <Wrapper>
      {" "}
      <div
        id="paginationSize"
        className={`paginationSize d-flex flex-stack flex-${
          !size ? "nowrap" : "wrap"
        } pt-0 mt-5 gap-3`}
        {...rest}
      >
        <div
          style={{ width: !size ? "50%" : "100%" }}
          className={`gap-3 fs-6 fw-bold text-gray-700 d-flex align-items-center ${
            !size ? "justify-content-start" : "justify-content-between"
          }`}
        >
          <Select
            id="paginationSelect"
            className=" w-75px me-3"
            defaultValue={DefaultPerPage}
            value={pageSize}
            placement="topLeft"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            onChange={(e) => {
              onPerPage(e);
            }}
            options={pageSizeOptions.map((size) => ({
              label: size,
              value: size,
            }))}
            // options={pageDropdown?.map((d) => {
            //   return { label: d, value: d };
            // })}
          />
          {`Showing Rows ${numberWithCommas(
            (page - 1) * pageSize + 1
          )} to  ${numberWithCommas(
            page * pageSize > totalPage ? totalPage : page * pageSize
          )}  of ${numberWithCommas(totalPage)}`}
        </div>
        {totalPage >= pageSize && (
          <ul
            className={`pagination justify-content-${!size ? "end" : "center"}`}
            style={{ width: !size ? "50%" : "100%" }}
          >
            <Pagination
              current={page}
              total={totalPage}
              size={`${!size ? "default" : "small"}`}
              pageSize={pageSize}
              showSizeChanger={false}
              onChange={(e) => onPageNo(e)}
            />
          </ul>
        )}
      </div>
    </Wrapper>
  );
}
