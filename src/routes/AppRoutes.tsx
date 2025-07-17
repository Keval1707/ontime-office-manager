import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Temp from "../pages/Temp";
import ClientManagement from "../pages/ClientManagement";
import TaskManagement from "../pages/TaskManagement";
import Settings from "../pages/Settings";
import ProjectManagement from "../pages/ProjectManagement";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<ClientManagement />} />
          <Route path="/tasks" element={<TaskManagement />} />
          <Route path="/projects" element={<ProjectManagement />} />
          <Route path="/settings/:settingType" element={<Settings />} />

          <Route path="/temp" element={<Temp />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
