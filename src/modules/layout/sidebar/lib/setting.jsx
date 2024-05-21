import { GetLinks } from "../../../../core";
import Icons from "../../../../icon";

export default [
  {
    key: "10",
    icon: <Icons type="setting" />,
    label: "Setting",
    children: [
      {
        key: "/setting/profile",
        icon: (
          <span className="menu-bullet">
            <span className="bullet bullet-dot" />
          </span>
        ),
        label: GetLinks("/setting/profile", "My Profile"),
      },
      {
        key: "/setting/amazon-sp",
        icon: (
          <span className="admin-schedular">
            <span className="bullet bullet-dot" />
          </span>
        ),
        label: GetLinks("/setting/amazon-sp", "MarketPlace Credentials"),
      },
    ],
  },
];
