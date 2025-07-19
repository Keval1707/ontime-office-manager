// src/routes/AppRoutes.tsx

import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { isLoggedIn } from "../utils/auth";
import { getComponentByPageKey } from "../components/common/pageKey";
import { routerLinks, routerGroups } from "../components/data/Route";
import type { JSX } from "react";
import Temp from "../pages/Temp";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};


// Flatten all routes (main + groups)
const allRoutes = [
  ...routerLinks,
  ...routerGroups.flatMap((group) => group.items),
];

const AppRoutes = () => {
  
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes inside Layout */}
        <Route element={<Layout />}>
          {allRoutes.map((route) => {
            const Component = getComponentByPageKey(route.pageKey);
            const element = route.isProtected ? (
              <ProtectedRoute>
                <Component />
              </ProtectedRoute>
            ) : (
              <Component />
            );
            return <Route key={route.id} path={route.Path} element={element} />;
          })}

          <Route path="/temp" element={<Temp />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
