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
    key: "/menu-items",
    icon: <PieChartOutlined />,
    // icon: <Icons type="dashboard" />,
    label: GetLinks("/menu-items", "Menu Items"),
  },
];
