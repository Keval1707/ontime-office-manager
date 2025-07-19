// src/components/common/pageKey.ts

import Dashboard from "../../pages/Dashboard";
import ClientManagement from "../../pages/ClientManagement";
import TaskManagement from "../../pages/TaskManagement";
import ProjectManagement from "../../pages/ProjectManagement";
import Payments from "../../pages/Payments";
import Settings from "../../pages/Settings";
import Temp from "../../pages/Temp";

export const pageComponentMap: Record<string, React.ComponentType> = {
  Dashboard: Dashboard,
  Clients: ClientManagement,
  Tasks: TaskManagement,
  Projects: ProjectManagement,
  Payments: Payments,
  Settings: Settings,
  Temp: Temp,
};

// Use pageKey instead of title
export const getComponentByPageKey = (key: string): React.ComponentType => {
  return pageComponentMap[key] || Temp;
};
