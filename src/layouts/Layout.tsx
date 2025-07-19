import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false); // 👈 Add this

  return (
    <div className="flex font-roboto bg-surface text-text min-h-screen">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileSidebarOpen}             // 👈 Pass down to Sidebar
        setIsMobileOpen={setIsMobileSidebarOpen}       // 👈 Pass control function
      />

      <div className="flex-1">
        <Navbar onSidebarToggle={() => setIsMobileSidebarOpen((prev) => !prev)} /> {/* 👈 Controls mobile sidebar */}
        <main className="p-layout">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
