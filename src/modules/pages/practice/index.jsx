import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Pie from "../../../components/am-charts/semi-circle-pie-chart";
import { Popover, Table, Tooltip } from "antd";
import { MakeApiCall } from "../../../api";

const Practice = () => {
  const [schedularLoading, setSchedularLoading] = useState(false);
  const [schedularData, setSchedularData] = useState([]);
  const [popoverVisible, setPopoverVisible] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const popoverRef = useRef(null);

  const openSchedulerPopover = (record) => {
    const uniqueKey = `${record.event_name}-${record.daily_frequency}-${record.daily_frequency_slots}`;
    setPopoverVisible((prevState) => ({
      ...prevState,
      [uniqueKey]: true,
    }));
  };

  const closeSchedulerPopover = (record) => {
    const uniqueKey = `${record.event_name}-${record.daily_frequency}-${record.daily_frequency_slots}`;
    setPopoverVisible((prevState) => ({
      ...prevState,
      [uniqueKey]: false,
    }));
  };

  const getFullDayName = (dayAbbreviation) => {
    const days = {
      Sun: "Sunday",
      Mon: "Monday",
      Tue: "Tuesday",
      Wed: "Wednesday",
      Thu: "Thursday",
      Fri: "Friday",
      Sat: "Saturday",
    };

    return days[dayAbbreviation] || "";
  };

  const handleButtonClick = () => {
    setIsLoading(true);

    // Simulating API call delay with setTimeout
    setTimeout(() => {
      // Mocking API response data
      const mockApiResponse = {
        data: "Mock API response data",
      };

      // setResponseData(mockApiResponse);
      setIsLoading(false);
      // Function to find the parent with the class 'ant-popover'
      function findParentWithClass(element, className) {
        while (element && !element.classList.contains(className)) {
          element = element.parentElement;
        }
        return element;
      }

      if (popoverRef.current) {
        console.log(popoverRef.current, "popover ref");

        const parentWithClass = findParentWithClass(
          popoverRef.current,
          "ant-popover"
        );
        console.log(parentWithClass, "parentWithClass");

        if (parentWithClass) {
          parentWithClass.classList.add("ant-popover-hidden");
        }

        // const pop = document.getElementsByClassName("ant-popover");
        // console.log(pop, "pop");
        // for (let i = 0; i < pop.length; i++) {
        //   pop[i].classList.add("ant-popover-hidden");
        // }
      }
    }, 4000); // Simulate a 1-second delay
  };

  const schedulerColumns = [
    {
      title: "Event Name",
      dataIndex: "event_name",
      key: "event_name",
    },
    {
      title: "Frequency Run",
      dataIndex: "daily_frequency",
      key: "daily_frequency",
      width: 150,
    },
    {
      title: "Run Time",
      dataIndex: "daily_frequency_slots",
      key: "daily_frequency_slots",
      width: 150,
      render: (text) => {
        const parsedArray = JSON.parse(text);
        // Check if the value is an array
        if (Array.isArray(parsedArray) && parsedArray.length > 0) {
          // Access the first element of the array and remove quotes
          const time = parsedArray[0].replace(/["']/g, "");
          return time;
        }
        return parsedArray;
      },
    },
    {
      title: "Lookback",
      dataIndex: "lookback",
      key: "lookback",
      width: 300,
      render: (text, record) => {
        const currentDay = new Date().toLocaleString("en-US", {
          weekday: "short",
        });
        const currentDayValue = record.lookback_days[currentDay];

        return (
          <>
            <div className="d-flex justify-content-start">
              <Tooltip
                // getTooltipContainer={(trigger) => trigger.parentNode}
                title="Click For More Details"
              >
                <Popover
                  className="w-50px"
                  title="Lookback Data"
                  getPopupContainer={(trigger) => trigger.parentNode}
                  trigger="click"
                  placement="bottomRight"
                  open={
                    popoverVisible[
                      `${record.event_name}-${record.daily_frequency}-${record.daily_frequency_slots}`
                    ] || false
                  }
                  onOpenChange={() => closeSchedulerPopover(record)}
                  content={
                    <div id="pop-up" ref={popoverRef}>
                      <ul>
                        {Object.entries(record.lookback_days).map(
                          ([day, value]) => (
                            <li
                              key={day}
                              className="list-item" // Add the CSS className here
                            >
                              <span style={{ fontWeight: "bolder" }}>
                                {getFullDayName(day)}
                              </span>{" "}
                              {value} days
                            </li>
                          )
                        )}
                      </ul>
                      <button onClick={handleButtonClick} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Fetch Data"}
                      </button>
                    </div>
                  }
                >
                  <span
                    className="watch-icon"
                    onClick={() => openSchedulerPopover(record)}
                    style={{ cursor: "pointer" }}
                  >
                    <svg
                      width="20"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="social-icon"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M21.6 12a9.6 9.6 0 1 1-19.2 0 9.6 9.6 0 0 1 19.2 0Zm-8.4-4.8a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Zm-2.4 3.6a1.2 1.2 0 0 0 0 2.4v3.6A1.2 1.2 0 0 0 12 18h1.2a1.2 1.2 0 1 0 0-2.4V12a1.2 1.2 0 0 0-1.2-1.2h-1.2Z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </Popover>
              </Tooltip>

              <p>
                {/* Every{" "} */}
                <span style={{ fontWeight: "bold" }}>
                  Today( {getFullDayName(currentDay)})
                </span>
                , data of the past{" "}
                <span style={{ fontWeight: "bold", padding: "5px" }}>
                  {currentDayValue}
                </span>
                {currentDayValue > 1 ? "days" : "day"} gets updated.
              </p>
            </div>
          </>
        );
      },
    },
  ];

  const getSchedulerData = async () => {
    const response = await MakeApiCall(
      `user/get-user-scheduler-setting`,
      "get",
      null,
      true
    );

    if (response?.status) {
      setSchedularData(response?.data || []);
      setSchedularLoading(false);
    } else {
      message.warning(response?.message);
      setSchedularLoading(false);
    }
  };

  useEffect(() => {
    setSchedularLoading(true);
    getSchedulerData();
    return () => {};
  }, []);

  return (
    <>
      <div>
        <Table
          loading={schedularLoading}
          dataSource={schedularData}
          columns={schedulerColumns}
          pagination={false}
          scroll={{
            x: 950,
            y: 500,
          }}
        />
      </div>
    </>
    // <>
    //   <div
    //     className="content d-flex flex-column flex-column-fluid"
    //     id="kt_content"
    //   >
    //     {/*begin::Post*/}
    //     <div className="post d-flex flex-column-fluid" id="kt_post">
    //       {/*begin::Container*/}
    //       <div id="kt_content_container" className="container-fluid">
    //         <div className="row mb-6 g-5">
    //           <div className="col-sm-12 col-lg-12 col-xl-12">
    //             <div className="card">
    //               <div className="card-body p-5">
    //                 <div className="d-flex flex-wrap gap-4">
    //                   <div className="position-relative">
    //                     {/* <input type="text" className="form-control form-control-solid fs-7"
    //                                                   placeholder="Enter Event Type "> */}
    //                     <select
    //                       className="form-select form-select-solid fs-7 min-w-225px select2-hidden-accessible"
    //                       data-control="select2"
    //                       data-placeholder="Select Event Type"
    //                       data-allow-clear="true"
    //                       data-select2-id="select2-data-1-fm64"
    //                       tabIndex={-1}
    //                       aria-hidden="true"
    //                       data-kt-initialized={1}
    //                     >
    //                       <option
    //                         value=""
    //                         data-select2-id="select2-data-3-yqcx"
    //                       />
    //                       <option value={1}>SP API Reports</option>
    //                     </select>
    //                     <span
    //                       className="select2 select2-container select2-container--bootstrap5"
    //                       dir="ltr"
    //                       data-select2-id="select2-data-2-r6hs"
    //                       style={{ width: "100%" }}
    //                     >
    //                       <span className="selection">
    //                         <span
    //                           className="select2-selection select2-selection--single form-select form-select-solid fs-7 min-w-225px"
    //                           role="combobox"
    //                           aria-haspopup="true"
    //                           aria-expanded="false"
    //                           tabIndex={0}
    //                           aria-disabled="false"
    //                           aria-labelledby="select2-bcwy-container"
    //                           aria-controls="select2-bcwy-container"
    //                         >
    //                           <span
    //                             className="select2-selection__rendered"
    //                             id="select2-bcwy-container"
    //                             role="textbox"
    //                             aria-readonly="true"
    //                             title="Select Event Type"
    //                           >
    //                             <span className="select2-selection__placeholder">
    //                               Select Event Type
    //                             </span>
    //                           </span>
    //                           <span
    //                             className="select2-selection__arrow"
    //                             role="presentation"
    //                           >
    //                             <b role="presentation" />
    //                           </span>
    //                         </span>
    //                       </span>
    //                       <span
    //                         className="dropdown-wrapper"
    //                         aria-hidden="true"
    //                       />
    //                     </span>
    //                   </div>
    //                   <div className="position-relative">
    //                     {/* <input type="text" className="form-control form-control-solid fs-7"
    //                                                   placeholder="Enter Event Type "> */}
    //                     <select
    //                       className="form-select form-select-solid fs-7 min-w-225px select2-hidden-accessible"
    //                       data-control="select2"
    //                       data-placeholder="Select Event "
    //                       data-allow-clear="true"
    //                       data-select2-id="select2-data-4-jynp"
    //                       tabIndex={-1}
    //                       aria-hidden="true"
    //                       data-kt-initialized={1}
    //                     >
    //                       <option
    //                         value=""
    //                         data-select2-id="select2-data-6-cqr4"
    //                       />
    //                     </select>
    //                     <span
    //                       className="select2 select2-container select2-container--bootstrap5"
    //                       dir="ltr"
    //                       data-select2-id="select2-data-5-8j01"
    //                       style={{ width: "100%" }}
    //                     >
    //                       <span className="selection">
    //                         <span
    //                           className="select2-selection select2-selection--single form-select form-select-solid fs-7 min-w-225px"
    //                           role="combobox"
    //                           aria-haspopup="true"
    //                           aria-expanded="false"
    //                           tabIndex={0}
    //                           aria-disabled="false"
    //                           aria-labelledby="select2-xgnp-container"
    //                           aria-controls="select2-xgnp-container"
    //                         >
    //                           <span
    //                             className="select2-selection__rendered"
    //                             id="select2-xgnp-container"
    //                             role="textbox"
    //                             aria-readonly="true"
    //                             title="Select Event "
    //                           >
    //                             <span className="select2-selection__placeholder">
    //                               Select Event{" "}
    //                             </span>
    //                           </span>
    //                           <span
    //                             className="select2-selection__arrow"
    //                             role="presentation"
    //                           >
    //                             <b role="presentation" />
    //                           </span>
    //                         </span>
    //                       </span>
    //                       <span
    //                         className="dropdown-wrapper"
    //                         aria-hidden="true"
    //                       />
    //                     </span>
    //                   </div>
    //                   <div className="position-relative">
    //                     {/* <input type="text" className="form-control form-control-solid fs-7"
    //                                                   placeholder="Enter Event Type "> */}
    //                     <select
    //                       className="form-select form-select-solid fs-7 min-w-175px select2-hidden-accessible"
    //                       data-control="select2"
    //                       data-placeholder="Select Status"
    //                       data-allow-clear="true"
    //                       data-select2-id="select2-data-7-6bbw"
    //                       tabIndex={-1}
    //                       aria-hidden="true"
    //                       data-kt-initialized={1}
    //                     >
    //                       <option
    //                         value=""
    //                         data-select2-id="select2-data-9-r4ze"
    //                       />
    //                       <option value={1}>All</option>
    //                       <option value={1}>In Progress</option>
    //                       <option value={1}>Failed</option>
    //                       <option value={1}>Done</option>
    //                       <option value={1}>Pending</option>
    //                     </select>
    //                     <span
    //                       className="select2 select2-container select2-container--bootstrap5"
    //                       dir="ltr"
    //                       data-select2-id="select2-data-8-61o2"
    //                       style={{ width: "100%" }}
    //                     >
    //                       <span className="selection">
    //                         <span
    //                           className="select2-selection select2-selection--single form-select form-select-solid fs-7 min-w-175px"
    //                           role="combobox"
    //                           aria-haspopup="true"
    //                           aria-expanded="false"
    //                           tabIndex={0}
    //                           aria-disabled="false"
    //                           aria-labelledby="select2-u2ka-container"
    //                           aria-controls="select2-u2ka-container"
    //                         >
    //                           <span
    //                             className="select2-selection__rendered"
    //                             id="select2-u2ka-container"
    //                             role="textbox"
    //                             aria-readonly="true"
    //                             title="Select Status"
    //                           >
    //                             <span className="select2-selection__placeholder">
    //                               Select Status
    //                             </span>
    //                           </span>
    //                           <span
    //                             className="select2-selection__arrow"
    //                             role="presentation"
    //                           >
    //                             <b role="presentation" />
    //                           </span>
    //                         </span>
    //                       </span>
    //                       <span
    //                         className="dropdown-wrapper"
    //                         aria-hidden="true"
    //                       />
    //                     </span>
    //                   </div>
    //                   <div className="position-relative dt-range ">
    //                     {/*begin::Daterangepicker(defined in src/js/layout/app.js)*/}
    //                     <div
    //                       data-kt-daterangepicker="true"
    //                       data-kt-daterangepicker-opens="left"
    //                       className="btn btn-sm bg-gray-100 d-flex align-items-center px-4"
    //                       data-kt-initialized={1}
    //                     >
    //                       {/*begin::Display range*/}
    //                       <div className="text-gray-600 fw-bold">
    //                         8 May 2024 - 6 Jun 2024
    //                       </div>
    //                       {/*end::Display range*/}
    //                       <i className="ki-duotone ki-calendar-8 fs-1 ms-2 me-0">
    //                         <span className="path1" />
    //                         <span className="path2" />
    //                         <span className="path3" />
    //                         <span className="path4" />
    //                         <span className="path5" />
    //                         <span className="path6" />
    //                       </i>
    //                     </div>
    //                     {/*end::Daterangepicker*/}
    //                   </div>
    //                   {/* <div className="position-relative "><button className="btn btn-primary btn-sm btn-icon h-40px w-40px"><i className="ki-outline ki-filter fs-3"></i></button></div>
    // 											<div className="position-relative "><button className="btn btn-light-primary btn-sm btn-icon h-40px w-40px"><i className="ki-outline ki-cross fs-1"></i></button></div> */}
    //                   <div className="position-relative ">
    //                     <a
    //                       href="calendar.html"
    //                       className="btn btn-dark btn-sm btn-icon h-40px w-40px"
    //                     >
    //                       <i className="ki-outline ki-calendar-2 fs-1" />
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="row mb-6 g-5">
    //           <>
    //             <button
    //               type="button"
    //               className="btn btn-primary"
    //               data-bs-toggle="modal"
    //               data-bs-target="#kt_modal_scrollable_2"
    //             >
    //               Launch demo modal
    //             </button>
    //             <div
    //               className="modal fade"
    //               tabIndex={-1}
    //               id="kt_modal_scrollable_2"
    //             >
    //               <div className="modal-dialog modal-dialog-scrollable">
    //                 <div className="modal-content">
    //                   <div className="modal-header">
    //                     <h5 className="modal-title">Modal title</h5>
    //                     {/*begin::Close*/}
    //                     <div
    //                       className="btn btn-icon btn-sm btn-active-light-primary ms-2"
    //                       data-bs-dismiss="modal"
    //                       aria-label="Close"
    //                     >
    //                       <i className="ki-duotone ki-cross fs-2x">
    //                         <span className="path1" />
    //                         <span className="path2" />
    //                       </i>
    //                     </div>
    //                     {/*end::Close*/}
    //                   </div>
    //                   <div className="modal-body">
    //                     <p>Long modal body text goes here.</p>
    //                   </div>
    //                   <div className="modal-footer">
    //                     <button
    //                       type="button"
    //                       className="btn btn-light"
    //                       data-bs-dismiss="modal"
    //                     >
    //                       Close
    //                     </button>
    //                     <button type="button" className="btn btn-primary">
    //                       Save changes
    //                     </button>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </>
    //         </div>
    //         <div className="row mb-6 g-5">
    //           <div className="col-sm-6 col-lg-6 col-xl-3">
    //             <div className="card overflow-hidden">
    //               <div className="card-body">
    //                 <div className="d-flex justify-content-between mb-3">
    //                   <div className="">
    //                     <h6 className="mb-2">Logs Completed</h6>
    //                     <h3 className="mb-0 text-dark fs-1 fw-bolder d-inline-flex">
    //                       2560
    //                     </h3>{" "}
    //                     <span className="badge bg-light-success text-green rounded-pill ms-1">
    //                       +06% <i className="fe fe-arrow-up" />
    //                     </span>
    //                   </div>
    //                   <div className="symbol symbol-50px me-0">
    //                     <span className="symbol-label bg-dark">
    //                       <i className="ki-outline ki-graph-up fs-2x text-gray-100" />{" "}
    //                     </span>
    //                   </div>
    //                 </div>
    //                 <small className="mb-0 text-muted">
    //                   Overview of Last month
    //                   <span className="float-end text-muted">40%</span>
    //                 </small>
    //                 <div className="h-5px me-3 w-100 bg-light-danger rounded">
    //                   <div
    //                     className="bg-danger rounded h-5px"
    //                     role="progressbar"
    //                     style={{ width: "62%" }}
    //                     aria-valuenow={50}
    //                     aria-valuemin={0}
    //                     aria-valuemax={100}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="col-sm-6 col-lg-6 col-xl-3">
    //             <div className="card overflow-hidden">
    //               <div className="card-body">
    //                 <div className="d-flex justify-content-between mb-3">
    //                   <div>
    //                     <h6 className="mb-2">Logs In Progress</h6>
    //                     <h3 className="mb-0 text-darkfs-1 fw-bolder d-inline-flex">
    //                       5023
    //                     </h3>{" "}
    //                     <span className="badge badge-light-success rounded-pill ms-1">
    //                       +15% <i className="fe fe-arrow-up" />
    //                     </span>
    //                   </div>
    //                   <div className="symbol symbol-50px me-0">
    //                     <span className="symbol-label bg-primary">
    //                       <i className="ki-outline ki-graph fs-2x text-gray-100" />{" "}
    //                     </span>
    //                   </div>
    //                 </div>{" "}
    //                 <small className="mb-0 text-muted">
    //                   Overview of Last month
    //                   <span className="float-end text-muted">60%</span>
    //                 </small>
    //                 <div className="h-5px me-3 w-100 bg-light-danger rounded">
    //                   <div
    //                     className="bg-danger rounded h-5px"
    //                     role="progressbar"
    //                     style={{ width: "62%" }}
    //                     aria-valuenow={50}
    //                     aria-valuemin={0}
    //                     aria-valuemax={100}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="col-sm-6 col-lg-6 col-xl-3">
    //             <div className="card overflow-hidden">
    //               <div className="card-body">
    //                 <div className="d-flex justify-content-between mb-3">
    //                   <div>
    //                     <h6 className="mb-2">Logs Failed</h6>
    //                     <h3 className="mb-0 text-dark fs-1 fw-bolder d-inline-flex">
    //                       2340
    //                     </h3>{" "}
    //                     <span className="badge badge-light-danger rounded-pill ms-1">
    //                       +08% <i className="fe fe-arrow-down" />
    //                     </span>
    //                   </div>
    //                   <div className="symbol symbol-50px me-0">
    //                     <span className="symbol-label bg-danger">
    //                       <i className="ki-outline ki-chart-line-down-2 fs-2x text-gray-100" />
    //                     </span>
    //                   </div>
    //                 </div>{" "}
    //                 <small className="mb-0 text-muted">
    //                   Overview of Last month
    //                   <span className="float-end text-muted">30%</span>
    //                 </small>
    //                 <div className="h-5px me-3 w-100 bg-light-danger rounded">
    //                   <div
    //                     className="bg-danger rounded h-5px"
    //                     role="progressbar"
    //                     style={{ width: "62%" }}
    //                     aria-valuenow={50}
    //                     aria-valuemin={0}
    //                     aria-valuemax={100}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="col-sm-6 col-lg-6 col-xl-3">
    //             <div className="card overflow-hidden">
    //               <div className="card-body">
    //                 <div className="d-flex justify-content-between mb-3">
    //                   <div>
    //                     <h6 className="mb-2">Logs Pending</h6>
    //                     <h3 className="mb-0 text-dark fs-1 fw-bolder d-inline-flex">
    //                       1043
    //                     </h3>{" "}
    //                     <span className="badge badge-light-danger rounded-pill ms-1">
    //                       +18% <i className="fe fe-arrow-down" />
    //                     </span>
    //                   </div>
    //                   <div className="symbol symbol-50px me-0">
    //                     <span className="symbol-label bg-warning">
    //                       <i className="ki-outline ki-chart-line fs-2x text-gray-100" />{" "}
    //                     </span>
    //                   </div>
    //                 </div>{" "}
    //                 <small className="mb-0 text-muted">
    //                   Overview of Last month
    //                   <span className="float-end text-muted">50%</span>
    //                 </small>
    //                 <div className="h-5px me-3  w-100 bg-light-danger rounded">
    //                   <div
    //                     className="bg-danger rounded h-5px"
    //                     role="progressbar"
    //                     style={{ width: "62%" }}
    //                     aria-valuenow={50}
    //                     aria-valuemin={0}
    //                     aria-valuemax={100}
    //                   />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="row">
    //           <div className="col-lg-12">
    //             <div className="card">
    //               <div className="card-header border-bottom-dashed">
    //                 <h3 className="card-title fw-bold">System Check</h3>
    //                 <div className="card-toolbar" />
    //               </div>
    //               <div className="card-body">
    //                 <div id="Revenu_Status1" style={{ minHeight: 265 }}>
    //                   <div
    //                     id="apexcharts67xfh6o5"
    //                     className="apexcharts-canvas apexcharts67xfh6o5 apexcharts-theme-light"
    //                     style={{ width: 815, height: 250 }}
    //                   >
    //                     <svg
    //                       id="SvgjsSvg1117"
    //                       width={815}
    //                       height={250}
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       version="1.1"
    //                       xmlnsXlink="http://www.w3.org/1999/xlink"
    //                       xmlns:svgjs="http://svgjs.dev"
    //                       className="apexcharts-svg apexcharts-zoomable"
    //                       xmlns:data="ApexChartsNS"
    //                       transform="translate(0, 0)"
    //                       style={{ background: "transparent" }}
    //                     >
    //                       <foreignObject x={0} y={0} width={815} height={250}>
    //                         <div
    //                           className="apexcharts-legend apexcharts-align-center apx-legend-position-bottom"
    //                           xmlns="http://www.w3.org/1999/xhtml"
    //                           style={{
    //                             inset: "auto 0px 1px",
    //                             position: "absolute",
    //                             maxHeight: 125,
    //                           }}
    //                         >
    //                           <div
    //                             className="apexcharts-legend-series"
    //                             rel={1}
    //                             seriesname="LogsxCompleted"
    //                             data:collapsed="false"
    //                             style={{ margin: "2px 5px" }}
    //                           >
    //                             <span
    //                               className="apexcharts-legend-marker"
    //                               rel={1}
    //                               data:collapsed="false"
    //                               style={{
    //                                 background: "rgb(7, 20, 55) !important",
    //                                 color: "rgb(7, 20, 55)",
    //                                 height: 12,
    //                                 width: 12,
    //                                 left: 0,
    //                                 top: 0,
    //                                 borderWidth: 0,
    //                                 borderColor: "rgb(255, 255, 255)",
    //                                 borderRadius: 12,
    //                               }}
    //                             />
    //                             <span
    //                               className="apexcharts-legend-text"
    //                               rel={1}
    //                               i={0}
    //                               data:default-text="Logs%20Completed"
    //                               data:collapsed="false"
    //                               style={{
    //                                 color: "rgb(55, 61, 63)",
    //                                 fontSize: 12,
    //                                 fontWeight: 400,
    //                                 fontFamily: "Helvetica, Arial, sans-serif",
    //                               }}
    //                             >
    //                               Logs Completed
    //                             </span>
    //                           </div>
    //                           <div
    //                             className="apexcharts-legend-series"
    //                             rel={2}
    //                             seriesname="LogsxFailed"
    //                             data:collapsed="false"
    //                             style={{ margin: "2px 5px" }}
    //                           >
    //                             <span
    //                               className="apexcharts-legend-marker"
    //                               rel={2}
    //                               data:collapsed="false"
    //                               style={{
    //                                 background: "rgb(211, 32, 39) !important",
    //                                 color: "rgb(211, 32, 39)",
    //                                 height: 12,
    //                                 width: 12,
    //                                 left: 0,
    //                                 top: 0,
    //                                 borderWidth: 0,
    //                                 borderColor: "rgb(255, 255, 255)",
    //                                 borderRadius: 12,
    //                               }}
    //                             />
    //                             <span
    //                               className="apexcharts-legend-text"
    //                               rel={2}
    //                               i={1}
    //                               data:default-text="Logs%20Failed"
    //                               data:collapsed="false"
    //                               style={{
    //                                 color: "rgb(55, 61, 63)",
    //                                 fontSize: 12,
    //                                 fontWeight: 400,
    //                                 fontFamily: "Helvetica, Arial, sans-serif",
    //                               }}
    //                             >
    //                               Logs Failed
    //                             </span>
    //                           </div>
    //                         </div>
    //                         <style
    //                           type="text/css"
    //                           dangerouslySetInnerHTML={{
    //                             __html:
    //                               "\t\n    \t\n      .apexcharts-legend {\t\n        display: flex;\t\n        overflow: auto;\t\n        padding: 0 10px;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom, .apexcharts-legend.apx-legend-position-top {\t\n        flex-wrap: wrap\t\n      }\t\n      .apexcharts-legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {\t\n        flex-direction: column;\t\n        bottom: 0;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-left, .apexcharts-legend.apx-legend-position-top.apexcharts-align-left, .apexcharts-legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {\t\n        justify-content: flex-start;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center, .apexcharts-legend.apx-legend-position-top.apexcharts-align-center {\t\n        justify-content: center;  \t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-right, .apexcharts-legend.apx-legend-position-top.apexcharts-align-right {\t\n        justify-content: flex-end;\t\n      }\t\n      .apexcharts-legend-series {\t\n        cursor: pointer;\t\n        line-height: normal;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom .apexcharts-legend-series, .apexcharts-legend.apx-legend-position-top .apexcharts-legend-series{\t\n        display: flex;\t\n        align-items: center;\t\n      }\t\n      .apexcharts-legend-text {\t\n        position: relative;\t\n        font-size: 14px;\t\n      }\t\n      .apexcharts-legend-text *, .apexcharts-legend-marker * {\t\n        pointer-events: none;\t\n      }\t\n      .apexcharts-legend-marker {\t\n        position: relative;\t\n        display: inline-block;\t\n        cursor: pointer;\t\n        margin-right: 3px;\t\n        border-style: solid;\n      }\t\n      \t\n      .apexcharts-legend.apexcharts-align-right .apexcharts-legend-series, .apexcharts-legend.apexcharts-align-left .apexcharts-legend-series{\t\n        display: inline-block;\t\n      }\t\n      .apexcharts-legend-series.apexcharts-no-click {\t\n        cursor: auto;\t\n      }\t\n      .apexcharts-legend .apexcharts-hidden-zero-series, .apexcharts-legend .apexcharts-hidden-null-series {\t\n        display: none !important;\t\n      }\t\n      .apexcharts-inactive-legend {\t\n        opacity: 0.45;\t\n      }",
    //                           }}
    //                         />
    //                       </foreignObject>
    //                       <rect
    //                         id="SvgjsRect1121"
    //                         width={0}
    //                         height={0}
    //                         x={0}
    //                         y={0}
    //                         rx={0}
    //                         ry={0}
    //                         opacity={1}
    //                         strokeWidth={0}
    //                         stroke="none"
    //                         strokeDasharray={0}
    //                         fill="#fefefe"
    //                       />
    //                       <g
    //                         id="SvgjsG1205"
    //                         className="apexcharts-yaxis"
    //                         rel={0}
    //                         transform="translate(-18, 0)"
    //                       />
    //                       <g
    //                         id="SvgjsG1119"
    //                         className="apexcharts-inner apexcharts-graphical"
    //                         transform="translate(12, 30)"
    //                       >
    //                         <defs id="SvgjsDefs1118">
    //                           <clipPath id="gridRectMask67xfh6o5">
    //                             <rect
    //                               id="SvgjsRect1123"
    //                               width="782.0681991577148"
    //                               height="163.73"
    //                               x={-3}
    //                               y={-1}
    //                               rx={0}
    //                               ry={0}
    //                               opacity={1}
    //                               strokeWidth={0}
    //                               stroke="none"
    //                               strokeDasharray={0}
    //                               fill="#fff"
    //                             />
    //                           </clipPath>
    //                           <clipPath id="forecastMask67xfh6o5" />
    //                           <clipPath id="nonForecastMask67xfh6o5" />
    //                           <clipPath id="gridRectMarkerMask67xfh6o5">
    //                             <rect
    //                               id="SvgjsRect1124"
    //                               width="780.0681991577148"
    //                               height="165.73"
    //                               x={-2}
    //                               y={-2}
    //                               rx={0}
    //                               ry={0}
    //                               opacity={1}
    //                               strokeWidth={0}
    //                               stroke="none"
    //                               strokeDasharray={0}
    //                               fill="#fff"
    //                             />
    //                           </clipPath>
    //                           <linearGradient
    //                             id="SvgjsLinearGradient1129"
    //                             x1={0}
    //                             y1={0}
    //                             x2={0}
    //                             y2={1}
    //                           >
    //                             <stop
    //                               id="SvgjsStop1130"
    //                               stopOpacity="0.5"
    //                               stopColor="rgba(7,20,55,0.5)"
    //                               offset="0.45"
    //                             />
    //                             <stop
    //                               id="SvgjsStop1131"
    //                               stopOpacity="0.4"
    //                               stopColor="rgba(255,255,255,0.4)"
    //                               offset={1}
    //                             />
    //                             <stop
    //                               id="SvgjsStop1132"
    //                               stopOpacity="0.4"
    //                               stopColor="rgba(255,255,255,0.4)"
    //                               offset={1}
    //                             />
    //                           </linearGradient>
    //                           <linearGradient
    //                             id="SvgjsLinearGradient1138"
    //                             x1={0}
    //                             y1={0}
    //                             x2={0}
    //                             y2={1}
    //                           >
    //                             <stop
    //                               id="SvgjsStop1139"
    //                               stopOpacity="0.5"
    //                               stopColor="rgba(211,32,39,0.5)"
    //                               offset="0.45"
    //                             />
    //                             <stop
    //                               id="SvgjsStop1140"
    //                               stopOpacity="0.4"
    //                               stopColor="rgba(255,255,255,0.4)"
    //                               offset={1}
    //                             />
    //                             <stop
    //                               id="SvgjsStop1141"
    //                               stopOpacity="0.4"
    //                               stopColor="rgba(255,255,255,0.4)"
    //                               offset={1}
    //                             />
    //                           </linearGradient>
    //                         </defs>
    //                         <line
    //                           id="SvgjsLine1122"
    //                           x1={0}
    //                           y1={0}
    //                           x2={0}
    //                           y2="161.73"
    //                           stroke="#b6b6b6"
    //                           strokeDasharray={3}
    //                           strokeLinecap="butt"
    //                           className="apexcharts-xcrosshairs"
    //                           x={0}
    //                           y={0}
    //                           width={1}
    //                           height="161.73"
    //                           fill="#b1b9c4"
    //                           filter="none"
    //                           fillOpacity="0.9"
    //                           strokeWidth={1}
    //                         />
    //                         <line
    //                           id="SvgjsLine1149"
    //                           x1={0}
    //                           y1="162.73"
    //                           x2={0}
    //                           y2="168.73"
    //                           stroke="#e0e0e0"
    //                           strokeDasharray={0}
    //                           strokeLinecap="butt"
    //                           className="apexcharts-xaxis-tick"
    //                         />
    //                         <line
    //                           id="SvgjsLine1151"
    //                           x1="86.22979990641277"
    //                           y1="162.73"
    //                           x2="86.22979990641277"
    //                           y2="168.73"
    //                           stroke="#e0e0e0"
    //                           strokeDasharray={0}
    //                           strokeLinecap="butt"
    //                           className="apexcharts-xaxis-tick"
    //                         />
    //                         <line
    //                           id="SvgjsLine1153"
    //                           x1="172.45959981282553"
    //                           y1="162.73"
    //                           x2="172.45959981282553"
    //                           y2="168.73"
    //                           stroke="#e0e0e0"
    //                           strokeDasharray={0}
    //                           strokeLinecap="butt"
    //                           className="apexcharts-xaxis-tick"
    //                         />
    //                         <line
    //                           id="SvgjsLine1155"
    //                           x1="258.6893997192383"
    //                           y1="162.73"
    //                           x2="258.6893997192383"
    //                           y2="168.73"
    //                           stroke="#e0e0e0"
    //                           strokeDasharray={0}
    //                           strokeLinecap="butt"
    //                           className="apexcharts-xaxis-tick"
    //                         />
    //                         <line
    //                           id="SvgjsLine1157"
    //                           x1="344.91919962565106"
    //                           y1="162.73"
    //                           x2="344.91919962565106"
    //                           y2="168.73"
    //                           stroke="#e0e0e0"
    //                           strokeDasharray={0}
    //                           strokeLinecap="butt"
    //                           className="apexcharts-xaxis-tick"
    //                         />
    //                         <line
    //                           id="SvgjsLine1159"
    //                           x1="431.14899953206384"
    //                           y1="162.73"
    //                           x2="431.14899953206384"
    //                           y2="168.73"
    //                           stroke="#e0e0e0"
    //                           strokeDasharray={0}
    //                           strokeLinecap="butt"
    //                           className="apexcharts-xaxis-tick"
    //                         />
    //                         <line
    //                           id="SvgjsLine1161"
    //                           x1="517.3787994384766"
    //                           y1="162.73"
    //                           x2="517.3787994384766"
    //                           y2="168.73"
    //                           stroke="#e0e0e0"
    //                           strokeDasharray={0}
    //                           strokeLinecap="butt"
    //                           className="apexcharts-xaxis-tick"
    //                         />
    //                         <line
    //                           id="SvgjsLine1163"
    //                           x1="603.6085993448893"
    //                           y1="162.73"
    //                           x2="603.6085993448893"
    //                           y2="168.73"
    //                           stroke="#e0e0e0"
    //                           strokeDasharray={0}
    //                           strokeLinecap="butt"
    //                           className="apexcharts-xaxis-tick"
    //                         />
    //                         <line
    //                           id="SvgjsLine1165"
    //                           x1="689.838399251302"
    //                           y1="162.73"
    //                           x2="689.838399251302"
    //                           y2="168.73"
    //                           stroke="#e0e0e0"
    //                           strokeDasharray={0}
    //                           strokeLinecap="butt"
    //                           className="apexcharts-xaxis-tick"
    //                         />
    //                         <line
    //                           id="SvgjsLine1167"
    //                           x1="776.0681991577147"
    //                           y1="162.73"
    //                           x2="776.0681991577147"
    //                           y2="168.73"
    //                           stroke="#e0e0e0"
    //                           strokeDasharray={0}
    //                           strokeLinecap="butt"
    //                           className="apexcharts-xaxis-tick"
    //                         />
    //                         <g id="SvgjsG1144" className="apexcharts-grid">
    //                           <g
    //                             id="SvgjsG1145"
    //                             className="apexcharts-gridlines-horizontal"
    //                           />
    //                           <g
    //                             id="SvgjsG1146"
    //                             className="apexcharts-gridlines-vertical"
    //                           >
    //                             <line
    //                               id="SvgjsLine1148"
    //                               x1={0}
    //                               y1={0}
    //                               x2={0}
    //                               y2="161.73"
    //                               stroke="#e0e0e0"
    //                               strokeDasharray={3}
    //                               strokeLinecap="butt"
    //                               className="apexcharts-gridline"
    //                             />
    //                             <line
    //                               id="SvgjsLine1150"
    //                               x1="86.22979990641277"
    //                               y1={0}
    //                               x2="86.22979990641277"
    //                               y2="161.73"
    //                               stroke="#e0e0e0"
    //                               strokeDasharray={3}
    //                               strokeLinecap="butt"
    //                               className="apexcharts-gridline"
    //                             />
    //                             <line
    //                               id="SvgjsLine1152"
    //                               x1="172.45959981282553"
    //                               y1={0}
    //                               x2="172.45959981282553"
    //                               y2="161.73"
    //                               stroke="#e0e0e0"
    //                               strokeDasharray={3}
    //                               strokeLinecap="butt"
    //                               className="apexcharts-gridline"
    //                             />
    //                             <line
    //                               id="SvgjsLine1154"
    //                               x1="258.6893997192383"
    //                               y1={0}
    //                               x2="258.6893997192383"
    //                               y2="161.73"
    //                               stroke="#e0e0e0"
    //                               strokeDasharray={3}
    //                               strokeLinecap="butt"
    //                               className="apexcharts-gridline"
    //                             />
    //                             <line
    //                               id="SvgjsLine1156"
    //                               x1="344.91919962565106"
    //                               y1={0}
    //                               x2="344.91919962565106"
    //                               y2="161.73"
    //                               stroke="#e0e0e0"
    //                               strokeDasharray={3}
    //                               strokeLinecap="butt"
    //                               className="apexcharts-gridline"
    //                             />
    //                             <line
    //                               id="SvgjsLine1158"
    //                               x1="431.14899953206384"
    //                               y1={0}
    //                               x2="431.14899953206384"
    //                               y2="161.73"
    //                               stroke="#e0e0e0"
    //                               strokeDasharray={3}
    //                               strokeLinecap="butt"
    //                               className="apexcharts-gridline"
    //                             />
    //                             <line
    //                               id="SvgjsLine1160"
    //                               x1="517.3787994384766"
    //                               y1={0}
    //                               x2="517.3787994384766"
    //                               y2="161.73"
    //                               stroke="#e0e0e0"
    //                               strokeDasharray={3}
    //                               strokeLinecap="butt"
    //                               className="apexcharts-gridline"
    //                             />
    //                             <line
    //                               id="SvgjsLine1162"
    //                               x1="603.6085993448893"
    //                               y1={0}
    //                               x2="603.6085993448893"
    //                               y2="161.73"
    //                               stroke="#e0e0e0"
    //                               strokeDasharray={3}
    //                               strokeLinecap="butt"
    //                               className="apexcharts-gridline"
    //                             />
    //                             <line
    //                               id="SvgjsLine1164"
    //                               x1="689.838399251302"
    //                               y1={0}
    //                               x2="689.838399251302"
    //                               y2="161.73"
    //                               stroke="#e0e0e0"
    //                               strokeDasharray={3}
    //                               strokeLinecap="butt"
    //                               className="apexcharts-gridline"
    //                             />
    //                             <line
    //                               id="SvgjsLine1166"
    //                               x1="776.0681991577147"
    //                               y1={0}
    //                               x2="776.0681991577147"
    //                               y2="161.73"
    //                               stroke="#e0e0e0"
    //                               strokeDasharray={3}
    //                               strokeLinecap="butt"
    //                               className="apexcharts-gridline"
    //                             />
    //                           </g>
    //                           <line
    //                             id="SvgjsLine1169"
    //                             x1={0}
    //                             y1="161.73"
    //                             x2="776.0681991577148"
    //                             y2="161.73"
    //                             stroke="transparent"
    //                             strokeDasharray={0}
    //                             strokeLinecap="butt"
    //                           />
    //                           <line
    //                             id="SvgjsLine1168"
    //                             x1={0}
    //                             y1={1}
    //                             x2={0}
    //                             y2="161.73"
    //                             stroke="transparent"
    //                             strokeDasharray={0}
    //                             strokeLinecap="butt"
    //                           />
    //                         </g>
    //                         <g
    //                           id="SvgjsG1125"
    //                           className="apexcharts-area-series apexcharts-plot-series"
    //                         >
    //                           <g
    //                             id="SvgjsG1126"
    //                             className="apexcharts-series"
    //                             seriesname="LogsxCompleted"
    //                             data:longestseries="true"
    //                             rel={1}
    //                             data:realindex={0}
    //                           >
    //                             <path
    //                               id="SvgjsPath1133"
    //                               d="M 0 161.73 L 0 158.4954 L 86.22979990641275 135.8532 L 172.4595998128255 143.61624 L 258.6893997192383 128.73708 L 344.919199625651 141.67548 L 431.1489995320638 135.8532 L 517.3787994384766 143.61624 L 603.6085993448893 128.73708 L 689.838399251302 141.67548 L 776.0681991577148 135.8532 L 776.0681991577148 161.73M 776.0681991577148 135.8532z"
    //                               fill="url(#SvgjsLinearGradient1129)"
    //                               fillOpacity={1}
    //                               strokeOpacity={1}
    //                               strokeLinecap="round"
    //                               strokeWidth={0}
    //                               strokeDasharray={0}
    //                               className="apexcharts-area"
    //                               index={0}
    //                               clipPath="url(#gridRectMask67xfh6o5)"
    //                               pathto="M 0 161.73 L 0 158.4954 L 86.22979990641275 135.8532 L 172.4595998128255 143.61624 L 258.6893997192383 128.73708 L 344.919199625651 141.67548 L 431.1489995320638 135.8532 L 517.3787994384766 143.61624 L 603.6085993448893 128.73708 L 689.838399251302 141.67548 L 776.0681991577148 135.8532 L 776.0681991577148 161.73M 776.0681991577148 135.8532z"
    //                               pathfrom="M -1 161.73 L -1 161.73 L 86.22979990641275 161.73 L 172.4595998128255 161.73 L 258.6893997192383 161.73 L 344.919199625651 161.73 L 431.1489995320638 161.73 L 517.3787994384766 161.73 L 603.6085993448893 161.73 L 689.838399251302 161.73 L 776.0681991577148 161.73"
    //                             />
    //                             <path
    //                               id="SvgjsPath1134"
    //                               d="M 0 158.4954 L 86.22979990641275 135.8532 L 172.4595998128255 143.61624 L 258.6893997192383 128.73708 L 344.919199625651 141.67548 L 431.1489995320638 135.8532 L 517.3787994384766 143.61624 L 603.6085993448893 128.73708 L 689.838399251302 141.67548 L 776.0681991577148 135.8532"
    //                               fill="none"
    //                               fillOpacity={1}
    //                               stroke="#071437"
    //                               strokeOpacity={1}
    //                               strokeLinecap="round"
    //                               strokeWidth={2}
    //                               strokeDasharray={0}
    //                               className="apexcharts-area"
    //                               index={0}
    //                               clipPath="url(#gridRectMask67xfh6o5)"
    //                               pathto="M 0 158.4954 L 86.22979990641275 135.8532 L 172.4595998128255 143.61624 L 258.6893997192383 128.73708 L 344.919199625651 141.67548 L 431.1489995320638 135.8532 L 517.3787994384766 143.61624 L 603.6085993448893 128.73708 L 689.838399251302 141.67548 L 776.0681991577148 135.8532"
    //                               pathfrom="M -1 161.73 L -1 161.73 L 86.22979990641275 161.73 L 172.4595998128255 161.73 L 258.6893997192383 161.73 L 344.919199625651 161.73 L 431.1489995320638 161.73 L 517.3787994384766 161.73 L 603.6085993448893 161.73 L 689.838399251302 161.73 L 776.0681991577148 161.73"
    //                               fillRule="evenodd"
    //                             />
    //                             <g
    //                               id="SvgjsG1127"
    //                               className="apexcharts-series-markers-wrap apexcharts-hidden-element-shown"
    //                               data:realindex={0}
    //                             >
    //                               <g className="apexcharts-series-markers">
    //                                 <circle
    //                                   id="SvgjsCircle1209"
    //                                   r={0}
    //                                   cx={0}
    //                                   cy={0}
    //                                   className="apexcharts-marker w2leo7777 no-pointer-events"
    //                                   stroke="#ffffff"
    //                                   fill="#071437"
    //                                   fillOpacity={1}
    //                                   strokeWidth={2}
    //                                   strokeOpacity="0.9"
    //                                   default-marker-size={0}
    //                                 />
    //                               </g>
    //                             </g>
    //                           </g>
    //                           <g
    //                             id="SvgjsG1135"
    //                             className="apexcharts-series"
    //                             seriesname="LogsxFailed"
    //                             data:longestseries="true"
    //                             rel={2}
    //                             data:realindex={1}
    //                           >
    //                             <path
    //                               id="SvgjsPath1142"
    //                               d="M 0 161.73 L 0 64.692 L 86.22979990641275 58.22279999999999 L 172.4595998128255 25.876800000000003 L 258.6893997192383 58.22279999999999 L 344.919199625651 90.5688 L 431.1489995320638 71.1612 L 517.3787994384766 87.3342 L 603.6085993448893 64.692 L 689.838399251302 32.346000000000004 L 776.0681991577148 64.692 L 776.0681991577148 161.73M 776.0681991577148 64.692z"
    //                               fill="url(#SvgjsLinearGradient1138)"
    //                               fillOpacity={1}
    //                               strokeOpacity={1}
    //                               strokeLinecap="round"
    //                               strokeWidth={0}
    //                               strokeDasharray={4}
    //                               className="apexcharts-area"
    //                               index={1}
    //                               clipPath="url(#gridRectMask67xfh6o5)"
    //                               pathto="M 0 161.73 L 0 64.692 L 86.22979990641275 58.22279999999999 L 172.4595998128255 25.876800000000003 L 258.6893997192383 58.22279999999999 L 344.919199625651 90.5688 L 431.1489995320638 71.1612 L 517.3787994384766 87.3342 L 603.6085993448893 64.692 L 689.838399251302 32.346000000000004 L 776.0681991577148 64.692 L 776.0681991577148 161.73M 776.0681991577148 64.692z"
    //                               pathfrom="M -1 161.73 L -1 161.73 L 86.22979990641275 161.73 L 172.4595998128255 161.73 L 258.6893997192383 161.73 L 344.919199625651 161.73 L 431.1489995320638 161.73 L 517.3787994384766 161.73 L 603.6085993448893 161.73 L 689.838399251302 161.73 L 776.0681991577148 161.73"
    //                             />
    //                             <path
    //                               id="SvgjsPath1143"
    //                               d="M 0 64.692 L 86.22979990641275 58.22279999999999 L 172.4595998128255 25.876800000000003 L 258.6893997192383 58.22279999999999 L 344.919199625651 90.5688 L 431.1489995320638 71.1612 L 517.3787994384766 87.3342 L 603.6085993448893 64.692 L 689.838399251302 32.346000000000004 L 776.0681991577148 64.692"
    //                               fill="none"
    //                               fillOpacity={1}
    //                               stroke="#d32027"
    //                               strokeOpacity={1}
    //                               strokeLinecap="round"
    //                               strokeWidth={2}
    //                               strokeDasharray={4}
    //                               className="apexcharts-area"
    //                               index={1}
    //                               clipPath="url(#gridRectMask67xfh6o5)"
    //                               pathto="M 0 64.692 L 86.22979990641275 58.22279999999999 L 172.4595998128255 25.876800000000003 L 258.6893997192383 58.22279999999999 L 344.919199625651 90.5688 L 431.1489995320638 71.1612 L 517.3787994384766 87.3342 L 603.6085993448893 64.692 L 689.838399251302 32.346000000000004 L 776.0681991577148 64.692"
    //                               pathfrom="M -1 161.73 L -1 161.73 L 86.22979990641275 161.73 L 172.4595998128255 161.73 L 258.6893997192383 161.73 L 344.919199625651 161.73 L 431.1489995320638 161.73 L 517.3787994384766 161.73 L 603.6085993448893 161.73 L 689.838399251302 161.73 L 776.0681991577148 161.73"
    //                               fillRule="evenodd"
    //                             />
    //                             <g
    //                               id="SvgjsG1136"
    //                               className="apexcharts-series-markers-wrap apexcharts-hidden-element-shown"
    //                               data:realindex={1}
    //                             >
    //                               <g className="apexcharts-series-markers">
    //                                 <circle
    //                                   id="SvgjsCircle1210"
    //                                   r={0}
    //                                   cx={0}
    //                                   cy={0}
    //                                   className="apexcharts-marker wiv55qt3j no-pointer-events"
    //                                   stroke="#ffffff"
    //                                   fill="#d32027"
    //                                   fillOpacity={1}
    //                                   strokeWidth={2}
    //                                   strokeOpacity="0.9"
    //                                   default-marker-size={0}
    //                                 />
    //                               </g>
    //                             </g>
    //                           </g>
    //                           <g
    //                             id="SvgjsG1128"
    //                             className="apexcharts-datalabels"
    //                             data:realindex={0}
    //                           />
    //                           <g
    //                             id="SvgjsG1137"
    //                             className="apexcharts-datalabels"
    //                             data:realindex={1}
    //                           />
    //                         </g>
    //                         <g
    //                           id="SvgjsG1147"
    //                           className="apexcharts-grid-borders"
    //                         >
    //                           <line
    //                             id="SvgjsLine1204"
    //                             x1={0}
    //                             y1="162.73"
    //                             x2="776.0681991577148"
    //                             y2="162.73"
    //                             stroke="#e0e0e0"
    //                             strokeDasharray={0}
    //                             strokeWidth={1}
    //                             strokeLinecap="butt"
    //                           />
    //                         </g>
    //                         <line
    //                           id="SvgjsLine1170"
    //                           x1={0}
    //                           y1={0}
    //                           x2="776.0681991577148"
    //                           y2={0}
    //                           stroke="#b6b6b6"
    //                           strokeDasharray={0}
    //                           strokeWidth={1}
    //                           strokeLinecap="butt"
    //                           className="apexcharts-ycrosshairs"
    //                         />
    //                         <line
    //                           id="SvgjsLine1171"
    //                           x1={0}
    //                           y1={0}
    //                           x2="776.0681991577148"
    //                           y2={0}
    //                           strokeDasharray={0}
    //                           strokeWidth={0}
    //                           strokeLinecap="butt"
    //                           className="apexcharts-ycrosshairs-hidden"
    //                         />
    //                         <g
    //                           id="SvgjsG1172"
    //                           className="apexcharts-xaxis"
    //                           transform="translate(0, 0)"
    //                         >
    //                           <g
    //                             id="SvgjsG1173"
    //                             className="apexcharts-xaxis-texts-g"
    //                             transform="translate(0, -4)"
    //                           >
    //                             <text
    //                               id="SvgjsText1175"
    //                               fontFamily="Helvetica, Arial, sans-serif"
    //                               x={0}
    //                               y="190.73"
    //                               textAnchor="middle"
    //                               dominantBaseline="auto"
    //                               fontSize="12px"
    //                               fontWeight={400}
    //                               fill="#373d3f"
    //                               className="apexcharts-text apexcharts-xaxis-label "
    //                               style={{
    //                                 fontFamily: "Helvetica, Arial, sans-serif",
    //                               }}
    //                             >
    //                               <tspan id="SvgjsTspan1176">10:00</tspan>
    //                               <title>10:00</title>
    //                             </text>
    //                             <text
    //                               id="SvgjsText1178"
    //                               fontFamily="Helvetica, Arial, sans-serif"
    //                               x="86.22979990641275"
    //                               y="190.73"
    //                               textAnchor="middle"
    //                               dominantBaseline="auto"
    //                               fontSize="12px"
    //                               fontWeight={400}
    //                               fill="#373d3f"
    //                               className="apexcharts-text apexcharts-xaxis-label "
    //                               style={{
    //                                 fontFamily: "Helvetica, Arial, sans-serif",
    //                               }}
    //                             >
    //                               <tspan id="SvgjsTspan1179">11:00</tspan>
    //                               <title>11:00</title>
    //                             </text>
    //                             <text
    //                               id="SvgjsText1181"
    //                               fontFamily="Helvetica, Arial, sans-serif"
    //                               x="172.45959981282553"
    //                               y="190.73"
    //                               textAnchor="middle"
    //                               dominantBaseline="auto"
    //                               fontSize="12px"
    //                               fontWeight={400}
    //                               fill="#373d3f"
    //                               className="apexcharts-text apexcharts-xaxis-label "
    //                               style={{
    //                                 fontFamily: "Helvetica, Arial, sans-serif",
    //                               }}
    //                             >
    //                               <tspan id="SvgjsTspan1182">12:00</tspan>
    //                               <title>12:00</title>
    //                             </text>
    //                             <text
    //                               id="SvgjsText1184"
    //                               fontFamily="Helvetica, Arial, sans-serif"
    //                               x="258.68939971923834"
    //                               y="190.73"
    //                               textAnchor="middle"
    //                               dominantBaseline="auto"
    //                               fontSize="12px"
    //                               fontWeight={400}
    //                               fill="#373d3f"
    //                               className="apexcharts-text apexcharts-xaxis-label "
    //                               style={{
    //                                 fontFamily: "Helvetica, Arial, sans-serif",
    //                               }}
    //                             >
    //                               <tspan id="SvgjsTspan1185">13:00</tspan>
    //                               <title>13:00</title>
    //                             </text>
    //                             <text
    //                               id="SvgjsText1187"
    //                               fontFamily="Helvetica, Arial, sans-serif"
    //                               x="344.9191996256511"
    //                               y="190.73"
    //                               textAnchor="middle"
    //                               dominantBaseline="auto"
    //                               fontSize="12px"
    //                               fontWeight={400}
    //                               fill="#373d3f"
    //                               className="apexcharts-text apexcharts-xaxis-label "
    //                               style={{
    //                                 fontFamily: "Helvetica, Arial, sans-serif",
    //                               }}
    //                             >
    //                               <tspan id="SvgjsTspan1188">14:00</tspan>
    //                               <title>14:00</title>
    //                             </text>
    //                             <text
    //                               id="SvgjsText1190"
    //                               fontFamily="Helvetica, Arial, sans-serif"
    //                               x="431.1489995320639"
    //                               y="190.73"
    //                               textAnchor="middle"
    //                               dominantBaseline="auto"
    //                               fontSize="12px"
    //                               fontWeight={400}
    //                               fill="#373d3f"
    //                               className="apexcharts-text apexcharts-xaxis-label "
    //                               style={{
    //                                 fontFamily: "Helvetica, Arial, sans-serif",
    //                               }}
    //                             >
    //                               <tspan id="SvgjsTspan1191">15:00</tspan>
    //                               <title>15:00</title>
    //                             </text>
    //                             <text
    //                               id="SvgjsText1193"
    //                               fontFamily="Helvetica, Arial, sans-serif"
    //                               x="517.3787994384766"
    //                               y="190.73"
    //                               textAnchor="middle"
    //                               dominantBaseline="auto"
    //                               fontSize="12px"
    //                               fontWeight={400}
    //                               fill="#373d3f"
    //                               className="apexcharts-text apexcharts-xaxis-label "
    //                               style={{
    //                                 fontFamily: "Helvetica, Arial, sans-serif",
    //                               }}
    //                             >
    //                               <tspan id="SvgjsTspan1194">16:00</tspan>
    //                               <title>16:00</title>
    //                             </text>
    //                             <text
    //                               id="SvgjsText1196"
    //                               fontFamily="Helvetica, Arial, sans-serif"
    //                               x="603.6085993448893"
    //                               y="190.73"
    //                               textAnchor="middle"
    //                               dominantBaseline="auto"
    //                               fontSize="12px"
    //                               fontWeight={400}
    //                               fill="#373d3f"
    //                               className="apexcharts-text apexcharts-xaxis-label "
    //                               style={{
    //                                 fontFamily: "Helvetica, Arial, sans-serif",
    //                               }}
    //                             >
    //                               <tspan id="SvgjsTspan1197">17:00</tspan>
    //                               <title>17:00</title>
    //                             </text>
    //                             <text
    //                               id="SvgjsText1199"
    //                               fontFamily="Helvetica, Arial, sans-serif"
    //                               x="689.838399251302"
    //                               y="190.73"
    //                               textAnchor="middle"
    //                               dominantBaseline="auto"
    //                               fontSize="12px"
    //                               fontWeight={400}
    //                               fill="#373d3f"
    //                               className="apexcharts-text apexcharts-xaxis-label "
    //                               style={{
    //                                 fontFamily: "Helvetica, Arial, sans-serif",
    //                               }}
    //                             >
    //                               <tspan id="SvgjsTspan1200">18:00</tspan>
    //                               <title>18:00</title>
    //                             </text>
    //                             <text
    //                               id="SvgjsText1202"
    //                               fontFamily="Helvetica, Arial, sans-serif"
    //                               x="776.0681991577147"
    //                               y="190.73"
    //                               textAnchor="middle"
    //                               dominantBaseline="auto"
    //                               fontSize="12px"
    //                               fontWeight={400}
    //                               fill="#373d3f"
    //                               className="apexcharts-text apexcharts-xaxis-label "
    //                               style={{
    //                                 fontFamily: "Helvetica, Arial, sans-serif",
    //                               }}
    //                             >
    //                               <tspan id="SvgjsTspan1203">19:00</tspan>
    //                               <title>19:00</title>
    //                             </text>
    //                           </g>
    //                         </g>
    //                         <g
    //                           id="SvgjsG1206"
    //                           className="apexcharts-yaxis-annotations"
    //                         />
    //                         <g
    //                           id="SvgjsG1207"
    //                           className="apexcharts-xaxis-annotations"
    //                         />
    //                         <g
    //                           id="SvgjsG1208"
    //                           className="apexcharts-point-annotations"
    //                         />
    //                         <rect
    //                           id="SvgjsRect1211"
    //                           width={0}
    //                           height={0}
    //                           x={0}
    //                           y={0}
    //                           rx={0}
    //                           ry={0}
    //                           opacity={1}
    //                           strokeWidth={0}
    //                           stroke="none"
    //                           strokeDasharray={0}
    //                           fill="#fefefe"
    //                           className="apexcharts-zoom-rect"
    //                         />
    //                         <rect
    //                           id="SvgjsRect1212"
    //                           width={0}
    //                           height={0}
    //                           x={0}
    //                           y={0}
    //                           rx={0}
    //                           ry={0}
    //                           opacity={1}
    //                           strokeWidth={0}
    //                           stroke="none"
    //                           strokeDasharray={0}
    //                           fill="#fefefe"
    //                           className="apexcharts-selection-rect"
    //                         />
    //                       </g>
    //                     </svg>
    //                     <div className="apexcharts-tooltip apexcharts-theme-light">
    //                       <div
    //                         className="apexcharts-tooltip-title"
    //                         style={{
    //                           fontFamily: "Helvetica, Arial, sans-serif",
    //                           fontSize: 12,
    //                         }}
    //                       />
    //                       <div
    //                         className="apexcharts-tooltip-series-group"
    //                         style={{ order: 1 }}
    //                       >
    //                         <span
    //                           className="apexcharts-tooltip-marker"
    //                           style={{ backgroundColor: "rgb(7, 20, 55)" }}
    //                         />
    //                         <div
    //                           className="apexcharts-tooltip-text"
    //                           style={{
    //                             fontFamily: "Helvetica, Arial, sans-serif",
    //                             fontSize: 12,
    //                           }}
    //                         >
    //                           <div className="apexcharts-tooltip-y-group">
    //                             <span className="apexcharts-tooltip-text-y-label" />
    //                             <span className="apexcharts-tooltip-text-y-value" />
    //                           </div>
    //                           <div className="apexcharts-tooltip-goals-group">
    //                             <span className="apexcharts-tooltip-text-goals-label" />
    //                             <span className="apexcharts-tooltip-text-goals-value" />
    //                           </div>
    //                           <div className="apexcharts-tooltip-z-group">
    //                             <span className="apexcharts-tooltip-text-z-label" />
    //                             <span className="apexcharts-tooltip-text-z-value" />
    //                           </div>
    //                         </div>
    //                       </div>
    //                       <div
    //                         className="apexcharts-tooltip-series-group"
    //                         style={{ order: 2 }}
    //                       >
    //                         <span
    //                           className="apexcharts-tooltip-marker"
    //                           style={{ backgroundColor: "rgb(211, 32, 39)" }}
    //                         />
    //                         <div
    //                           className="apexcharts-tooltip-text"
    //                           style={{
    //                             fontFamily: "Helvetica, Arial, sans-serif",
    //                             fontSize: 12,
    //                           }}
    //                         >
    //                           <div className="apexcharts-tooltip-y-group">
    //                             <span className="apexcharts-tooltip-text-y-label" />
    //                             <span className="apexcharts-tooltip-text-y-value" />
    //                           </div>
    //                           <div className="apexcharts-tooltip-goals-group">
    //                             <span className="apexcharts-tooltip-text-goals-label" />
    //                             <span className="apexcharts-tooltip-text-goals-value" />
    //                           </div>
    //                           <div className="apexcharts-tooltip-z-group">
    //                             <span className="apexcharts-tooltip-text-z-label" />
    //                             <span className="apexcharts-tooltip-text-z-value" />
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                     <div className="apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom apexcharts-theme-light">
    //                       <div
    //                         className="apexcharts-xaxistooltip-text"
    //                         style={{
    //                           fontFamily: "Helvetica, Arial, sans-serif",
    //                           fontSize: 12,
    //                         }}
    //                       />
    //                     </div>
    //                     <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
    //                       <div className="apexcharts-yaxistooltip-text" />
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="row gy-5 g-xl-5 mt-0">
    //           {/*begin::Col*/}
    //           <div className="col-xxl-12">
    //             {/*begin::Tables Widget 9*/}
    //             <div className="card card-xxl-stretch mb-5 mb-xl-8">
    //               {/*begin::Header*/}
    //               <div className="card-header ">
    //                 {/*begin::Title*/}
    //                 <h3 className="card-title fw-bold">
    //                   System Check Log Lists
    //                 </h3>
    //                 {/*end::Title*/}
    //                 {/*begin::Toolbar*/}
    //                 <div className="card-toolbar"></div>
    //                 {/*end::Toolbar*/}
    //               </div>
    //               {/*end::Header*/}
    //               {/*begin::Body*/}
    //               <div className="card-body py-3">
    //                 <div className="table-responsive">
    //                   {/*begin::Table*/}
    //                   <table
    //                     className="table align-middle table-row-dashed  table-row-gray-300 gs-4 gy-4 gx-4 border-top-d"
    //                     id=""
    //                   >
    //                     <thead>
    //                       <tr className="fw-bolder text-dark bg-light-danger fs-6">
    //                         <th className="min-w-150px">
    //                           System Event Process ID{" "}
    //                         </th>
    //                         <th className="min-w-100px">Log Date </th>
    //                         <th className="min-w-100px">Log Status</th>
    //                         <th className="min-w-100px">Order ID</th>
    //                         <th className="min-w-100px">Order Date</th>
    //                         <th className="min-w-100px">Order Status</th>
    //                         <th className="min-w-100px">Marketplace ID</th>
    //                         <th className="min-w-100px">Sales Channel</th>
    //                       </tr>
    //                     </thead>
    //                     <tbody className="text-gray-700 fw-bold fs-7">
    //                       <tr className="">
    //                         <td>1011</td>
    //                         <td>2024-01-09</td>
    //                         <td>
    //                           <span className="rounded text-warning fw-semibold fs-7 bg-light-warning py-2 px-4 ">
    //                             Pending{" "}
    //                           </span>
    //                         </td>
    //                         <td>FBA123</td>
    //                         <td>2024-01-09</td>
    //                         <td>
    //                           <span className="rounded text-success fw-semibold fs-7 bg-light-success py-2 px-4 ">
    //                             Shipped
    //                           </span>
    //                         </td>
    //                         <td>Amazon</td>
    //                         <td>Amazon.com</td>
    //                       </tr>
    //                       <tr className="">
    //                         <td>1011</td>
    //                         <td>2024-01-09</td>
    //                         <td>
    //                           <span className="rounded text-warning fw-semibold fs-7 bg-light-warning py-2 px-4 ">
    //                             Pending{" "}
    //                           </span>
    //                         </td>
    //                         <td>FBA123</td>
    //                         <td>2024-01-09</td>
    //                         <td>
    //                           <span className="rounded text-success fw-semibold fs-7 bg-light-success py-2 px-4 ">
    //                             Shipped
    //                           </span>
    //                         </td>
    //                         <td>Amazon</td>
    //                         <td>Amazon.com</td>
    //                       </tr>
    //                       <tr className="">
    //                         <td>1011</td>
    //                         <td>2024-01-09</td>
    //                         <td>
    //                           <span className="rounded text-warning fw-semibold fs-7 bg-light-warning py-2 px-4 ">
    //                             Pending{" "}
    //                           </span>
    //                         </td>
    //                         <td>FBA123</td>
    //                         <td>2024-01-09</td>
    //                         <td>
    //                           <span className="rounded text-success fw-semibold fs-7 bg-light-success py-2 px-4 ">
    //                             Shipped
    //                           </span>
    //                         </td>
    //                         <td>Amazon</td>
    //                         <td>Amazon.com</td>
    //                       </tr>
    //                       <tr className="">
    //                         <td>1011</td>
    //                         <td>2024-01-09</td>
    //                         <td>
    //                           <span className="rounded text-warning fw-semibold fs-7 bg-light-warning py-2 px-4 ">
    //                             Pending{" "}
    //                           </span>
    //                         </td>
    //                         <td>FBA123</td>
    //                         <td>2024-01-09</td>
    //                         <td>
    //                           <span className="rounded text-success fw-semibold fs-7 bg-light-success py-2 px-4 ">
    //                             Shipped
    //                           </span>
    //                         </td>
    //                         <td>Amazon</td>
    //                         <td>Amazon.com</td>
    //                       </tr>
    //                     </tbody>
    //                   </table>
    //                   {/*end::Table*/}
    //                 </div>
    //               </div>
    //               {/*begin::Body*/}
    //             </div>
    //             {/*end::Tables Widget 9*/}
    //           </div>
    //           {/*end::Col*/}
    //         </div>
    //       </div>
    //       {/*end::Container*/}
    //     </div>
    //     {/*end::Post*/}
    //   </div>
    // </>
  );
};

export default Practice;
