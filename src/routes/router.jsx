import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/HomePage/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Registration from "../pages/Authentication/Registration/Registration";


export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
            index:true,
            Component:Home
        },
       
    ]
  },
  {
    path:'/',
    Component:AuthLayout,
    children:[
      {
        path:'login',
        Component:Login
      },
      {
        path:'registration',
        Component:Registration
      },
    ]
  },
]);