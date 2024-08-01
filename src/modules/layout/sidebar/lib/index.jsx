import dashboard from "./dashboard";
import datepicker from "./datepicker";
import logs from "./logs";
import reports from "./redux";
import setting from "./setting";
import settingAdmin from "./settingAdmin";
import table from "./table";
import cards from "./cards";
import forms from "./forms";
import redux from "./redux";
import menuItems from "./menu-items";
import practice from "./practice";
import charts from "./charts";
import button from "./button";

const payload = [
  ...button,
  ...cards,
  ...charts,
  ...practice,
  ...datepicker,
  ...table,

  ...forms,
  ...dashboard,
  ...logs,
  ...redux,
  ...menuItems,
  ...reports,
  ...setting,
  ...settingAdmin,
];

export default payload;
