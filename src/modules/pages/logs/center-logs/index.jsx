// import React from "react";
// import Chart from "react-apexcharts";
// import { useQuery, useMutation, useQueryClient } from "react-query";
// import axios from "axios";
// import DateRangePickerComponent from "../../../../components/range-picker";

// const options = {
//   chart: {
//     height: 310,
//     type: "line",
//     stacked: false,
//   },
//   xaxis: {
//     categories: ["Jan", "Feb", "Mar", "Apr"],
//   },
// };

// const series = [
//   {
//     name: "Sales",
//     type: "bar",
//     data: [30, -40, 35, -50],
//   },
//   {
//     name: "Profit",
//     type: "bar",
//     data: [20, -25, 30, -35],
//   },
//   {
//     name: "Expenses",
//     type: "line",
//     data: [10, -15, 20, -25],
//   },
//   {
//     name: "Revenue",
//     type: "line",
//     data: [-5, 10, -15, 20],
//   },
//   {
//     name: "Growth",
//     type: "line",
//     data: [-15, 20, -25, 30],
//   },
//   {
//     name: "Loss",
//     type: "line",
//     data: [25, -30, 35, -40],
//   },
// ];

// const CenterLogs = () => {
//   const queryClient = useQueryClient(); // Access the query client
//   // const [dateRange, setDateRange] = useState({
//   //   startDate: new Date(),
//   //   endDate: new Date(),
//   //   key: "daterange",
//   // });

//   const {
//     data: userData,
//     isLoading,
//     error,
//   } = useQuery("data", async () => {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     return response.data;
//   });

//   const mutation = useMutation(
//     (updatedUser) =>
//       axios.put(
//         `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
//         updatedUser
//       ),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("data"); // Refetch the updated data after mutation
//       },
//     }
//   );

//   const updateUser = (userId) => {
//     mutation.mutate({ id: userId, name: "Updated Name" });
//   };

//   if (isLoading) {
//     return <span>Loading...</span>;
//   }

//   if (error) {
//     return <span>Error: {error.message}</span>;
//   }

//   // return (
//   //   <>
//   //     <div className="mixed-chart">
//   //       {/* Assuming `options` and `series` are defined */}
//   //       <Chart options={options} series={series} type="line" width="900" />
//   //     </div>
//   //     <div>
//   //       <h1>User Data</h1>
//   //       <ul>
//   //         {userData?.map((user) => (
//   //           <li key={user.id}>
//   //             {user.name} - {user.email}{" "}
//   //             <button onClick={() => updateUser(user.id)}>Update Name</button>
//   //             {/* Display updated name if it's being updated */}
//   //             {mutation.isLoading && mutation.variables.id === user.id && (
//   //               <span>Updating...</span>
//   //             )}
//   //             {mutation.isSuccess && mutation.variables.id === user.id && (
//   //               <span>Updated Name</span>
//   //             )}
//   //           </li>
//   //         ))}
//   //       </ul>
//   //     </div>
//   //   </>
//   // );

//   const handleDateRangeChange = (start, end) => {
//     setDateRange({ startDate: start, endDate: end });
//     // Perform actions based on selected dates (e.g., fetch data, filter results)
//     console.log(
//       "Selected Date Range:",
//       startDate.format("YYYY-MM-DD"),
//       "-",
//       endDate.format("YYYY-MM-DD")
//     );
//   };
//   return (
//     <>
//       <DateRangePickerComponent id="1" />
//       <DateRangePickerComponent id="2" />
//     </>
//   );
// };

// export default CenterLogs;

import React from "react";
import { Layout, Menu, Statistic, Table } from "antd";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const { Header, Sider, Content } = Layout;

const CenterLogs = () => {
  const data = [
    { month: "Jan", performance: 11 },
    { month: "Feb", performance: 21 },
    { month: "Mar", performance: 35 },
    { month: "Apr", performance: 41 },
    { month: "May", performance: 73 },
    { month: "Jun", performance: 81 },
    { month: "Jul", performance: 88 },
    { month: "Aug", performance: 83 },
    { month: "Sep", performance: 55 },
    { month: "Oct", performance: 21 },
    { month: "Nov", performance: 35 },
    { month: "Dec", performance: 55 },
    { month: "Dec", performance: 55 },
  ];

  const dataSource = [
    {
      key: "1",
      title: "Product 1",
      sku: "SKU001",
      asin: "B12345",
      brand: "Brand A",
      velocity: 10,
      unitsSold: 100,
      order: 50,
      revenue: 1500,
      netProfit: 500,
      netMargin: 0.33,
      netRoi: 1.5,
    },
    {
      key: "2",
      title: "Product B",
      sku: "SKU002",
      asin: "B12346",
      brand: "Brand B",
      velocity: 10,
      unitsSold: 100,
      order: 50,
      revenue: 1500,
      netProfit: 500,
      netMargin: 0.33,
      netRoi: 1.5,
    },
  ];

  const columns = [
    {
      title: "Sku",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "ASIN",
      dataIndex: "asin",
      key: "asin",
    },
    {
      title: "Velocity",
      dataIndex: "velocity",
      key: "velocity",
    },
    {
      title: "Units Sold",
      dataIndex: "unitsSold",
      key: "unitsSold",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
    },
    {
      title: "Net Profit",
      dataIndex: "netProfit",
      key: "netProfit",
    },
    {
      title: "Net Margin",
      dataIndex: "netMargin",
      key: "netMargin",
    },
    {
      title: "Net ROI",
      dataIndex: "netRoi",
      key: "netRoi",
    },
  ];

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "A Line Chart",
    },
    xAxis: {
      categories: data.map((entry) => entry.month),
    },
    yAxis: {
      title: {
        text: "Performance",
      },
    },
    series: [
      {
        name: "Performance",
        data: data.map((entry) => entry.performance),
      },
    ],
  };

  return (
    <Layout>
      <Header style={{ background: "#001529", padding: 0 }} />
      <Layout>
        <Sider style={{ background: "#001529" }}>
          <Menu mode="inline" style={{ background: "#001529", color: "#fff" }}>
            {/* Add your menu items here */}
          </Menu>
        </Sider>
        <Content style={{ padding: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Statistic title="Total Sales" value={452} />
            <Statistic title="This Month Profit" value={5532} />
            <Statistic title="This Month Sales" value={732} />
            <Statistic title="Total Products" value={4532} />
          </div>
          <HighchartsReact highcharts={Highcharts} options={options} />
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CenterLogs;
