import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex font-roboto bg-surface text-text">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-h-screen">
        <Navbar onSidebarToggle={() => setSidebarOpen(true)} />

        <main className="p-layout">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
