import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Signup from "./components/myComponent/Signup";
import HeroSection from "./components/myComponent/HeroSection";
import Login from "./components/myComponent/Login";
import Signup_Login from "./components/myComponent/Signup_Login";
import { Toaster } from "./components/ui/toaster";
import { Provider } from "react-redux";
import store from "../redux/store.js";
import JobsSection from "./components/myComponent/JobsSection";
import UserProfile from "./components/myComponent/UserProfile";
import JobDescription from "./components/myComponent/JobDescription";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Companies from "./components/Recruiters/Companies";
import CreateCompany from "./components/Recruiters/CreateCompany";
import CompanySetup from "./components/Recruiters/CompanySetup";
import CompanyJobsSection from "./components/Recruiters/CompanyJobsSection";
import CreateJob from "./components/Recruiters/CreateJob";
import JobApplicants from "./components/Recruiters/JobApplicants";
import ProtectedRoute from "./components/Recruiters/ProtectedRoute";
import UserProtectedRoute from "./components/myComponent/UserProtectedRoute";
import NotFound from "./components/NotFound";

export let persistor = persistStore(store);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/jobs",
        element: <UserProtectedRoute><JobsSection /></UserProtectedRoute> ,
      },
      {
        path: "/profile",
        element: <UserProtectedRoute><UserProfile /></UserProtectedRoute>  ,
      },
      {
        path: "/description/:id",
        element:<UserProtectedRoute><JobDescription /></UserProtectedRoute> ,
      },
      {
        path: "/admin/companies",
        element: (
          <ProtectedRoute>
            <Companies />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies/create",
        element: (
          <ProtectedRoute>
            <CreateCompany />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/companies/:id",
        element: (
          <ProtectedRoute>
            <CompanySetup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs",
        element: (
          <ProtectedRoute>
            <CompanyJobsSection />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/create",
        element: (
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/job/:id/applicants",
        element: (
          <ProtectedRoute>
            <JobApplicants />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Signup_Login />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path:"*",
    element: <NotFound/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
