import CenterLogs from "../modules/pages/logs/center-logs";
import IconsPage from "../modules/pages/logs/icons-page";
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
      {
        path: "icons-page",
        element: <IconsPage />,
      },
    ],
  },
];
