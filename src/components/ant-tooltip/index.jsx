// const [sortFilters, setSortFilters] = useState({
//     key: "",
//     type: "",
//   });

// const extraProps = (type) => {
//     if (type) {
//       return {
//         defaultSortOrder: type === sortFilters?.key ? sortFilters.type : [],
//         sorter: () => {},
//       };
//     }
//   };

// const handleOnChangeColumn = (_, __, sorter) => {
//     setSortFilters({
//       key: sorter?.order ? sorter?.column?.isFilterKey : "",
//       type: sorter?.order || "",
//     });
//     // console.clear();
//     console.log(sorter, "sorter");
//     const apiObj = {
//       page: 1,
//       perPage: pageSize,
//       searchTerm: searchTerm,
//       sales_channel: "Amazon.com",
//       filter_date:
//         moment(filter?.date_period?.[0].$d).format("MMM DD, YYYY") +
//         " - " +
//         moment(filter?.date_period?.[1].$d).format("MMM DD, YYYY"),
//       filterKey: selectedDateRangeType,
//       isExport: 0,
//       viewBy: selectedViewBy,
//       sort:
//         sorter?.order === "ascend"
//           ? sorter?.column?.isFilterKey
//           : `-${sorter?.column?.isFilterKey}`,
//     };

//     setSalesTableLoading(true);
//     GetSalesAnalyticsTableData(apiObj);
//   };

//   onChange={handleOnChangeColumn}

//   columns={columns  ?.map((d) => ({
//     ...d,
//     ...extraProps(d?.isFilterKey),
//   }))}

//   const columns = [
//     {
//       title: "Orders",
//       dataIndex: "total_orders",
//       key: "total_orders",
//       isFilterKey: "total_orders",
//       render: (item) => {
//         return (
//           <div>
//             <span>{NumberWithCommas(item)}</span>
//           </div>
//         );
//       },
//     },]
