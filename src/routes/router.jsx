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
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
// import AddProperty from "../pages/AgentDashboard/AddProperty/AddProperty";
import AgentDashboard from "../pages/Dashboard/Agent/AgentDashboard";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import UserDashboard from "../pages/Dashboard/User/UserDashboard";
import AddProperty from "../pages/Dashboard/Agent/AddProperty/AddProperty";
import MyProperties from "../pages/Dashboard/Agent/MyProperties/MyProperties";
import UpdateProperty from "../pages/Dashboard/Agent/MyProperties/UpdateProperty/UpdateProperty";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home
      },

    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'registration',
        Component: Registration
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {

        path: 'agent',
        Component: AgentDashboard,
      },

      {
        path: 'agent/addProperty',
        element: <AddProperty />
      },
      {
        path: 'agent/my-properties',
        element: <MyProperties></MyProperties>
      },
      {
        path: 'agent/update-property/:id',
        element: <UpdateProperty></UpdateProperty>
      },


      {
        path: 'admin',
        Component: AdminDashboard
      },
      {
        path: 'user',
        Component: UserDashboard
      },
    ]
  }
]); 4