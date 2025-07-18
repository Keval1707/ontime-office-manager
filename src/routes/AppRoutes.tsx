import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Temp from "../pages/Temp";
import ClientManagement from "../pages/ClientManagement";
import TaskManagement from "../pages/TaskManagement";
import Settings from "../pages/Settings";
import ProjectManagement from "../pages/ProjectManagement";
import { isLoggedIn } from "../utils/auth";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import type { JSX } from "react";
import Payments from "../pages/Payments";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route
            path="/"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/clients"
            element={<ProtectedRoute><ClientManagement /></ProtectedRoute>}
          />
          <Route
            path="/tasks"
            element={<ProtectedRoute><TaskManagement /></ProtectedRoute>}
          />
          <Route
            path="/projects"
            element={<ProtectedRoute><ProjectManagement /></ProtectedRoute>}
          />
          <Route
            path="/settings/:settingType"
            element={<ProtectedRoute><Settings /></ProtectedRoute>}
          />
          <Route
            path="/payments"
            element={<ProtectedRoute><Payments /></ProtectedRoute>}
          />
          <Route path="/temp" element={<Temp />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
