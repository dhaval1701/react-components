import CenterLogs from "../modules/pages/logs/center-logs";
import ReportLogs from "../modules/pages/logs/report-logs";

export default [
  {
    path: "logs",
    children: [
      {
        path: "central-logs",
        element: <CenterLogs />,
      },
      {
        path: "report-logs",
        element: <ReportLogs />,
      },
    ],
  },
];
