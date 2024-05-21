import { GetLinks } from "../../core";
import Icons from "../../icon";

export const transformedMenu = (menus) => {
  return menus.map((menu) => {
    const transformedMenu = {
      index: menu.key, // Adding the index property
      key: menu.path,
      icon: <Icons type={menu.icon} />,
      label:
        menu.isChild && menu.isChild.length > 0
          ? menu.label
          : GetLinks(menu.path, menu.label),
    };

    if (menu.isAdmin) {
      transformedMenu.admin = true;
    }

    if (menu.isChild && menu.isChild.length > 0) {
      transformedMenu.children = menu.isChild.map((child) => ({
        index: child.key, // Adding the index property
        key: `${menu.path}${child.path}`,
        icon: <Icons type={child.icon} />,
        label: GetLinks(`${menu.path}${child.path}`, child.label),
      }));
    }

    return transformedMenu;
  });
};
