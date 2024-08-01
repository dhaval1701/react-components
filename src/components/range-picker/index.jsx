import React, { useEffect, useRef, useState } from "react";
import "jquery";
import "daterangepicker/daterangepicker.css";
import "daterangepicker";
import moment from "moment";

const DateRangePickerComponent = ({ id }) => {
  const inputRef = useRef();
  const containerRef = useRef();
  const [pickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    const start = moment().subtract(29, "days");
    const end = moment();

    $(inputRef.current).daterangepicker({
      startDate: start,
      endDate: end,
      opens: "left",
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

    const picker = $(inputRef.current).data("daterangepicker");

    const updatePickerPosition = () => {
      if (containerRef.current && picker.container) {
        const inputRect = inputRef.current.getBoundingClientRect();
        const pickerElement = picker.container[0];

        console.log(inputRect, "inputRect");
        console.log(pickerElement, "pickerElement");

        pickerElement.style.top = `${inputRect.bottom}px`;
        pickerElement.style.left = `${inputRect.left}px`;
        pickerElement.style.right = "auto";
        pickerElement.style.zIndex = "100"; // Set z-index to ensure it is above other elements
      }
    };

    $(inputRef.current).on("show.daterangepicker", () => {
      setPickerVisible(true);
      updatePickerPosition();
    });

    $(inputRef.current).on("hide.daterangepicker", () => {
      setPickerVisible(false);
    });

    const handleScroll = () => {
      if (pickerVisible) {
        updatePickerPosition();
      }
    };

    window.addEventListener("scroll", handleScroll, true);

    return () => {
      $(inputRef.current).off("show.daterangepicker hide.daterangepicker");
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [pickerVisible]);

  return (
    <div ref={containerRef}>
      <input
        ref={inputRef}
        id={id}
        type="text"
        className="form-control w-full"
      />
    </div>
  );
};

export default DateRangePickerComponent;
