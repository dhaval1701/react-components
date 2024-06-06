import React, { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Table } from "antd";

// const menus = [
//   {
//     path: "/dashboard",
//     icon: <span>Icons</span>,
//     key: 1,
//     isAdmin: true,
//     label: "Dashboard",
//     isChild: [
//       {
//         path: "/dashboard/email-setup",
//         icon: '<Icons type="email-setup" />',
//         label: "Email Setup",
//       },
//     ],
//   },
//   {
//     path: "/dashboard",
//     icon: <span>Icons</span>,
//     isAdmin: true,
//     label: "Dashboard",
//     key: 0,
//     isChild: [
//       {
//         path: "/dashboard/email-setup",
//         icon: '<Icons type="email-setup" />',
//         label: "Email Setup",
//       },
//     ],
//   },
// ];

const columns = [
  {
    key: "sort",
  },
  // {
  //   title: "Name",
  //   dataIndex: "name",
  // },
  // {
  //   title: "Age",
  //   dataIndex: "age",
  // },
  // {
  //   title: "Address",
  //   dataIndex: "address",
  // },
  {
    title: "Index",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Path",
    dataIndex: "path",
    key: "path",
  },
  {
    title: "Is Admin",
    dataIndex: "isAdmin",
    key: "isAdmin",
    render: (isAdmin) => (isAdmin ? "Yes" : "No"),
  },
  {
    title: "Label",
    dataIndex: "label",
    key: "label",
  },
];

const Row = ({ children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      }
    ),
    transition,
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999,
        }
      : {}),
  };
  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if (child.key === "sort") {
          return React.cloneElement(child, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{
                  touchAction: "none",
                  cursor: "move",
                }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};
const MenuItems = () => {
  const [dataSource, setDataSource] = useState(
    //   [
    //   {
    //     key: "1",
    //     name: "John Brown",
    //     age: 32,
    //     address:
    //       "Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text",
    //   },
    //   {
    //     key: "2",
    //     name: "Jim Green",
    //     age: 42,
    //     address: "London No. 1 Lake Park",
    //   },
    //   {
    //     key: "3",
    //     name: "Joe Black",
    //     age: 32,
    //     address: "Sidney No. 1 Lake Park",
    //   },
    // ]
    []
  );
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      const reorderedData = arrayMove(
        dataSource,
        dataSource.findIndex((i) => i.key === active.id),
        dataSource.findIndex((i) => i.key === over?.id)
      );
      setDataSource(reorderedData);

      // Saving reorderedData to localStorage
      localStorage.setItem("menus", JSON.stringify(reorderedData));

      // Dispatch a custom event to notify other components
      const event = new Event("menusChanged");
      window.dispatchEvent(event);
    }
  };

  useEffect(() => {
    // Fetching menus from localStorage
    const storedMenus = localStorage.getItem("menus");

    if (storedMenus) {
      setDataSource(JSON.parse(storedMenus));
    }
  }, []);

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext
        // rowKey array
        items={dataSource.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          components={{
            body: {
              row: Row,
            },
          }}
          rowKey="key"
          columns={columns}
          dataSource={dataSource}
        />
      </SortableContext>
    </DndContext>
  );
};
export default MenuItems;
