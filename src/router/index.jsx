import cards from "./cards";
import charts from "./charts";
import dashboard from "./dashboard";
import datepicker from "./datepicker";
import forms from "./forms";
import logs from "./logs";
import menuItems from "./menu-items";
import practice from "./practice";
import redux from "./redux";
import table from "./table";

export const PageRoutes = [
  ...forms,
  ...cards,
  ...table,
  // ...dashboard,
  ...datepicker,
  ...logs,
  ...redux,
  ...menuItems,
  ...practice,
  ...charts,
];

export const AdminRoutes = [...dashboard];

export const routeObject = {
  1: [...dashboard],
  2: [...PageRoutes],
};

// const PageRoutes = (type = 4) => {
//   console.log(type, "type----");
//   return type === 1
//     ? [...dashboard]
//     : [
//         ...forms,
//         ...cards,
//         ...table,
//         // ...dashboard,
//         ...datepicker,
//         ...logs,
//         ...redux,
//         ...menuItems,
//         ...practice,
//         ...charts,
//       ];
// };

const PageRouter = () => {
  return (
    <Suspense fallback={null}>
      <Switch>
        {Routes_?.map((d, i) => {
          return (
            <Route
              key={i}
              path={d?.path}
              component={d?.component}
              exact={d?.exact}
            />
          );
        })}

        <Route
          path="*"
          render={() => (
            <div>
              {" "}
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                  <Button
                    type="primary"
                    onClick={() => (window.location.href = "/login")}
                  >
                    Back Home
                  </Button>
                }
              />
            </div>
          )}
        />
      </Switch>
    </Suspense>
  );
};

// export default PageRoutes;
