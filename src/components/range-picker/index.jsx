import React, { useEffect, useRef } from "react";
import "jquery";
import "daterangepicker/daterangepicker.css";
import "daterangepicker";
import moment from "moment"; // Import moment library

const DateRangePickerComponent = () => {
  const inputRef = useRef();

  useEffect(() => {
    var start = moment().subtract(29, "days");
    var end = moment();

    $(inputRef.current).daterangepicker({
      startDate: start,
      endDate: end,
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "Last 7 Days": [moment().subtract(6, "days"), moment()],
        "Last 30 Days": [moment().subtract(29, "days"), moment()],
        "This Month": [moment().startOf("month"), moment().endOf("month")],
        "Last Month": [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
      },
    });

    // Get the div with class 'daterangepicker' and add a unique id attribute
    const daterangepickerDivs = document.querySelectorAll(".daterangepicker");
    daterangepickerDivs.forEach((div, index) => {
      div.setAttribute("id", `myDateRangePicker_${index}`);
    });
  }, []);

  return (
    <div>
      {/* <input ref={inputRef} type="text" /> */}
      <div ref={inputRef}>Test</div>
    </div>
  );
};

export default DateRangePickerComponent;
