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
import RatingFeedback from "../layouts/Rating/RatingFeedback";
import PartnerRegister from "../features/Register/PartnerRegister";
import WorkerDashboard from "../layouts/WorkerDashboard/WorkerDashboard";
import JobList from "../layouts/WorkerDashboard/JobList";
import CurrentJob from "../layouts/WorkerDashboard/CurrentJob";
import WorkerEarnings from "../layouts/WorkerDashboard/WorkerEarnings";
import WorkerProfile from "../layouts/WorkerDashboard/WorkerProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { 
        index: true, 
        element: <Home /> 
      },
      // ✅ CUSTOMER ROUTES
      {
        path: "create",
        element: <CreateTask />
      },
      {
        path: "matching",  
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
      {
        path: "rating",
        element: <RatingFeedback/>
      },
      
      // ✅ WORKER ROUTES
      {
        path: "worker-dashboard",
        element: <WorkerDashboard />
      },
      {
        path: "worker/jobs",
        element: <JobList />
      },
      {
        path: "worker/current",
        element: <CurrentJob/>
      },
      {
        path: "worker/earnings",
        element: <WorkerEarnings/>
      },
      {
        path: "worker/profile",
        element: <WorkerProfile />
      },
      {
        path: "worker/settings",
        element: <div>Worker Settings (Coming Soon)</div>
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
  },
  {
    path: "/partner-register",
    element: <PartnerRegister />
  },
]);
