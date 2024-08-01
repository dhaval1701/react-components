import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { GetLinks } from "../../../../core";
import Icons from "../../../../icon";

export default [
  {
    key: "5",
    // icon: <Icons type="logs" />,
    icon: <Icons type="logs-fill" />,
    label: "Logs",
    children: [
      {
        key: "/logs/central-logs",
        icon: <MinusOutlined />,
        label: GetLinks("/logs/central-logs", "Central"),
      },
      {
        key: "/logs/report-logs",
        icon: <MinusOutlined />,
        label: GetLinks("/logs/report-logs", "Application"),
      },
      {
        key: "/logs/icons-page",
        icon: <MinusOutlined />,
        label: GetLinks("/logs/icons-page", "Icons"),
      },
      {
        key: "/logs/style-page",
        icon: <MinusOutlined />,
        label: GetLinks("/logs/style-page", "Style"),
      },
    ],
  },
];
