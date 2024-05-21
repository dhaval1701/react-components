import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { GetLinks } from "../../../../core";
import Icons from "../../../../icon";

export default [
  {
    key: "/dashboard",
    icon: <Icons type="dashboard-fill" />,
    // icon: <Icons type="dashboard" />,
    label: GetLinks("/dashboard", "Dashboard"),
  },
];
