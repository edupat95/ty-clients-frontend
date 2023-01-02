import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "../pages/Login/Login";
import Cashier from "../pages/Cashier/Cashier";
import AssociateCustomer from "../pages/AssociateCustomer/AssociateCustomer";
import Administration from "../pages/Administration/Administration";

const router = createBrowserRouter([
  { path: "/", element: <Login/> },
  { path: "/login", element: <Login/> },
  { path: "/cashier", element: <Cashier /> },
  { path: "/associate-customer", element: <AssociateCustomer /> },
  { path: "/administration", element: <Administration /> }
]);

function ConfigRoutes () {
  return (
    <RouterProvider router={router} />
  )
};
export default ConfigRoutes;

/*
ReactDOM.createRoot(document.getElementById("root")).render(supermarket cashier
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);*/