import React, { lazy, Suspense, useContext } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Routes,
  BrowserRouter,
} from "react-router-dom";
// import Login from "./modules/pages/auth/index.jsx";
// import Page from "./modules/pages/index.jsx";
import PageRoutes from "./router/index.jsx";
import LoadingAnimation from "./app-loader/index.jsx";
import { GlobalContext } from "./commonContext.jsx";
import { useEffect } from "react";
import { useState } from "react";

const Login = lazy(() => import("./modules/pages/auth/index.jsx"));
const Page = lazy(() => import("./modules/pages/index.jsx"));

const isAuthenticated = () => {
  console.log(localStorage.getItem("isLoggedIn"), "isLoggedIn");
  return localStorage.getItem("isLoggedIn") === "true";
};

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

// console.log(isAuthenticated(), "PrivateRoute");

// Function to recursively generate routes
const generateRoutes = (routesArray) => {
  return routesArray.map((route, index) => {
    const { path, element, children } = route;
    return (
      <Route key={index} path={path} element={element}>
        {children && generateRoutes(children)}
      </Route>
    );
  });
};

// console.log(PageRoutes, "pageRoutes");

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingAnimation />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingAnimation />}>
        <PrivateRoute element={<Page />} />
      </Suspense>
    ),
    children: [...PageRoutes],
  },
]);

// const AppRouter = (userType) => {
//   return (
//     <BrowserRouter>
//       <Suspense fallback={<LoadingAnimation />}>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Page />} />
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );

// const routes = [
//   {
//     path: "/login",
//     element: (
//       <Suspense fallback={<LoadingAnimation />}>
//         <Login />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/",
//     element: (
//       <Suspense fallback={<LoadingAnimation />}>
//         <PrivateRoute element={<Page />} />
//       </Suspense>
//     ),
//     children: PageRoutes(data?.userType_),
//   },
// ];

// const router = createBrowserRouter(routes);

// return router;
// };

// export default AppRouter;

// export const router = createBrowserRouter(routes);

// export const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path={"/login"} element={<Login />} />
//       <Route path={"/"} element={<PrivateRoute element={<Page />} />}>
//         {generateRoutes(PageRoutes)}
//       </Route>
//       <Route path="*" element={<div>404</div>} />
//     </Route>
//   )
// );
