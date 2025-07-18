import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";
import { logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const linkStyle =
    "block px-4 py-2 text-sm font-medium rounded transition text-sidebarText hover:bg-hover";
  const activeStyle = "bg-hover text-white";

  return (
    <aside
      className={`fixed lg:static top-0 left-0 z-50 w-64 min-h-screen bg-sidebar p-layout border-r border-border transform transition-transform duration-200 ease-in-out animation-fadeIn ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
    >
      <div className="lg:hidden flex justify-end mb-4">
        <button onClick={onClose}>
          <X className="w-6 h-6 text-sidebarText" />
        </button>
      </div>

      <h2 className="text-subtitle text-sidebarText font-semibold mb-6">
        My Dashboard
      </h2>

      <nav className="space-y-2">
        <NavLink
          to="/"
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? `${linkStyle} ${activeStyle}` : linkStyle
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/clients"
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? `${linkStyle} ${activeStyle}` : linkStyle
          }
        >
          Clients
        </NavLink>
        <NavLink
          to="/tasks"
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? `${linkStyle} ${activeStyle}` : linkStyle
          }
        >
          Tasks
        </NavLink>
        <NavLink
          to="/projects"
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? `${linkStyle} ${activeStyle}` : linkStyle
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/payments"
          onClick={onClose}
          className={({ isActive }) =>
            isActive ? `${linkStyle} ${activeStyle}` : linkStyle
          }
        >
          Payments
        </NavLink>

        {/* 🔽 Settings Dropdown */}
        <div>
          <button
            onClick={() => setSettingsOpen((prev) => !prev)}
            className={`${linkStyle} flex justify-between items-center w-full`}
          >
            <span>Settings</span>
            {settingsOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {settingsOpen && (
            <div className="ml-4 mt-1 space-y-1">
              <NavLink
                to="/settings/projectStatus"
                onClick={onClose}
                className={({ isActive }) =>
                  isActive ? `${linkStyle} ${activeStyle}` : linkStyle
                }
              >
                Project Status
              </NavLink>
              <NavLink
                to="/settings/taskStatus"
                onClick={onClose}
                className={({ isActive }) =>
                  isActive ? `${linkStyle} ${activeStyle}` : linkStyle
                }
              >
                Task Status
              </NavLink>
              <NavLink
                to="/settings/userRoles"
                onClick={onClose}
                className={({ isActive }) =>
                  isActive ? `${linkStyle} ${activeStyle}` : linkStyle
                }
              >
                User Roles
              </NavLink>
              <NavLink
                to="/settings/notifications"
                onClick={onClose}
                className={({ isActive }) =>
                  isActive ? `${linkStyle} ${activeStyle}` : linkStyle
                }
              >
                Notifications
              </NavLink>
            </div>
          )}
        </div>

        <button
  className={`${linkStyle} w-full text-left`}
  onClick={() => {
    logoutUser();
    onClose?.();
    navigate("/login");
  }}
>
  Logout
</button>


      </nav>
    </aside>
  );
};

export default Sidebar;
