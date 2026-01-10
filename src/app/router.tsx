import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../features/Home";
import Login from "../features/Login/Login";
import Register from "../features/Register/Register";
import ForgetPassword from "../features/ForgetPassword/ForgetPassword";
import CreateTask from "../layouts/CreateTask/CreateTask";
import MatchingWorkers from "../layouts/MatchingWorker/MatchingWorkers";
import TrackTask from "../layouts/TrackTask/TrackTask";
import CustomerProfile from "../layouts/CustomerProfile/CustomerProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { 
        index: true, 
        element: <Home /> 
      },
      {
        path: "create",
        element: <CreateTask />
      },
      {
        path: "matching",  // ← Chỉ giữ 1 route này
        element: <MatchingWorkers />
      },
      {
        path: "tracking",
        element: <div>Tracking Page (Coming Soon)</div>
      },
      {
        path: "notifications",
        element: <div>Notifications Page (Coming Soon)</div>
      },
      {
        path: "profile",
        element: <CustomerProfile />
      },
      {
        path: "my-jobs",
        element: <TrackTask />
      },
      
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />
  }
]);
