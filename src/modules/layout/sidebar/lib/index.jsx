import dashboard from "./dashboard";
import datepicker from "./datepicker";
import logs from "./logs";
import manageUser from "./forms";
import reports from "./redux";
import setting from "./setting";
import settingAdmin from "./settingAdmin";
import systemCheck from "./cards";
import table from "./table";
import cards from "./cards";
import forms from "./forms";
import redux from "./redux";
import menuItems from "./menu-items";

const payload = [
  ...datepicker,
  ...table,
  ...cards,
  ...forms,
  ...dashboard,
  ...logs,
  ...redux,
  ...menuItems,
  // ...reports,
  // ...systemCheck,
  // ...setting,
  // ...manageUser,
  // ...settingAdmin,
];

export default payload;
