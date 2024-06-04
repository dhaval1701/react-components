import cards from "./cards";
import dashboard from "./dashboard";
import datepicker from "./datepicker";
import forms from "./forms";
import logs from "./logs";
import menuItems from "./menu-items";
import practice from "./practice";
import redux from "./redux";
import table from "./table";

const PageRoutes = [
  ...forms,
  ...cards,
  ...table,
  ...dashboard,
  ...datepicker,
  ...logs,
  ...redux,
  ...menuItems,
  ...practice,
];

export default PageRoutes;
