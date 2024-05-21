import { GetLinks } from "../../../../core";
import Icons from "../../../../icon";

export default [
  {
    key: "9",
    icon: <Icons type="setting" />,
    label: "Setting",
    admin: "true",
    children: [
      {
        key: "/setting/app-configuration",
        icon: (
          <span className="menu-bullet">
            <span className="bullet bullet-dot" />
          </span>
        ),
        label: GetLinks("/setting/app-configuration", "App Configuration"),
      },
      {
        key: "/setting/admin-schedular",
        icon: (
          <span className="admin-schedular">
            <span className="bullet bullet-dot" />
          </span>
        ),
        label: GetLinks("/setting/admin-schedular", "Admin Schedular"),
      },
    ],
  },
];
