import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/shared/Layout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { Toaster } from "sonner";
import { ResumeInfoProvider } from "./context/ResumeInfoContext";
// Lazy-loaded components
const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/auth/Login"));
const Signup = lazy(() => import("./components/auth/Signup"));
const Jobs = lazy(() => import("./components/Jobs"));
const Browse = lazy(() => import("./components/Browse"));
const Profile = lazy(() => import("./components/Profile"));
const JobDescription = lazy(() => import("./components/JobDescription"));
const Dashboard = lazy(() => import("./dashboard"));
const EditResume = lazy(() => import("./dashboard/resume/[resumeId]/edit/index.jsx"));
const ViewResume = lazy(() => import("./my-resume/[resumeId]/view/index.jsx"));

// Admin routes
const Companies = lazy(() => import("./components/admin/Companies"));
const CompanyCreate = lazy(() => import("./components/admin/CompanyCreate"));
const CompanySetup = lazy(() => import("./components/admin/CompanySetup"));
const AdminJobs = lazy(() => import("./components/admin/AdminJobs"));
const PostJob = lazy(() => import("./components/admin/PostJob"));
const Applicants = lazy(() => import("./components/admin/Applicants"));
const EditJob = lazy(() => import("./components/admin/Editjob"));



//recruiter routes
const RecruiterCompanies = lazy(() => import("./components/recruiter/RecruiterCompanies"));
const RecruiterCompanyCreate = lazy(() => import("./components/recruiter/CompanyCreate"));
const RecruiterCompanySetup = lazy(() => import("./components/recruiter/CompanySetup"));
const RecruiterJobs = lazy(() => import("./components/recruiter/AdminJobs"));
const RecruiterEditJob = lazy(() => import("./components/recruiter/Editjob"));
const RecruiterPostJob = lazy(() => import("./components/recruiter/PostJob"));
const RecruiterApplicants = lazy(() => import("./components/recruiter/Applicants"));


// Router Configuration
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/jobs", element: <Jobs /> },
      { path: "/description/:id", element: <JobDescription /> },
      { path: "/browse", element: <Browse /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/dashboard/resume/:resumeId/edit", element: <EditResume /> },
      {
        path: "/my-resume/:resumeId/view", element:
          <ResumeInfoProvider>
            <ViewResume />
          </ResumeInfoProvider>
      },
      { path: "/profile", element: <Profile /> },

      // Admin routes
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
            <CompanyCreate />
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
            <AdminJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/:id",
        element: (
          <ProtectedRoute>
            <EditJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/create",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/jobs/:id/applicants",
        element: (
          <ProtectedRoute>
            <Applicants />
          </ProtectedRoute>
        ),
      },

      // recruiter routes
      {
        path: "/sample-recruiter",
        element: (
          <ProtectedRoute>
            <RecruiterCompanies />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sample-recruiter/create",
        element: (
          <ProtectedRoute>
            <RecruiterCompanyCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sample-recruiter/:id",
        element: (
          <ProtectedRoute>
            <RecruiterCompanySetup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recruiterjobs",
        element: (
          <ProtectedRoute>
            <RecruiterJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recruiterjobs/:id",
        element: (
          <ProtectedRoute>
            <RecruiterEditJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recruiterjobs/create",
        element: (
          <ProtectedRoute>
            <RecruiterPostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recruiterjobs/:id/applicants",
        element: (
          <ProtectedRoute>
            <RecruiterApplicants />
          </ProtectedRoute>
        ),
      }
    ],
  },
]);

// App Component
const Router = () => (
  <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
    <RouterProvider router={appRouter} />
    <Toaster position="top-right" richColors />
  </Suspense>
);

export default Router;
