import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { useState, useEffect } from "react";
import { logoutUser } from "../utils/auth";
import { routerLinks, routerGroups } from "../components/data/Route";
import { iconMap } from "./common/iconMap";

interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

const Sidebar = ({
  isCollapsed,
  toggleCollapse,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) => {
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});
  const [isMobile, setIsMobile] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsMobileOpen(false); // Close mobile sidebar on route change
    }
  }, [location.pathname, isMobile]);

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }));
  };

  const closeAllGroups = () => setOpenGroups({});

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const linkStyle =
    "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-sidebarText hover:bg-hover hover:text-white";
  const activeStyle = "bg-hover text-white";

  const isLinkActive = (basePath: string) =>
    location.pathname.startsWith(basePath);

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && !isMobileOpen && (
        <button
          className="fixed top-4 left-4 z-50 bg-hover text-white p-2 rounded-full shadow-lg"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu />
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`font-roboto bg-sidebar border-r border-border z-40 transition-all duration-300 ease-in-out flex flex-col
        ${isMobile
            ? `fixed top-0 left-0 h-full w-64 shadow-lg transform ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`
            : `min-h-screen ${isCollapsed ? "w-16" : "w-64"}`
          }`}
      >
        {/* Collapse Toggle (Desktop only) */}
        {!isMobile && (
          <div className="px-3 py-3 border-b border-border flex justify-end bg-sidebar">
            <button
              onClick={toggleCollapse}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-hover text-white hover:shadow-md transition-all duration-300"
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
          </div>
        )}

        {/* Mobile Close Button */}
        {isMobile && (
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="text-white bg-hover rounded-full p-2"
            >
              <X />
            </button>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 overflow-y-auto pt-4 relative">
          {routerLinks.filter(link => link.show !== false).map((link) => (
            <NavLink
              key={link.id}
              to={link.Path}
              className={`${linkStyle} ${isLinkActive(link.basePath || link.Path) ? activeStyle : ""}`}
              title={isCollapsed && !isMobile ? link.Title : undefined}
              onClick={() => {
                closeAllGroups();
                if (isMobile) setIsMobileOpen(false);
              }}
            >
              <div className="flex items-center gap-3">
                {link.iconKey && (
                  <span className="w-5 h-5 flex items-center justify-center">
                    {iconMap[link.iconKey]}
                  </span>
                )}
                {(!isCollapsed || isMobile) && <span>{link.Title}</span>}
              </div>
            </NavLink>
          ))}

          {/* Grouped Links */}
          {routerGroups.map((group) => {
            const isOpen = openGroups[group.groupTitle];
            const isAnyItemActive = group.items.some((item) =>
              isLinkActive(item.basePath || item.Path)
            );

            return (
              <div key={group.groupTitle} className="relative group">
                <button
                  onClick={() => toggleGroup(group.groupTitle)}
                  className={`${linkStyle} ${isAnyItemActive ? activeStyle : ""} justify-between w-full`}
                  title={isCollapsed && !isMobile ? group.groupTitle : undefined}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 flex items-center justify-center">
                      {iconMap[group.items[0]?.pageKey]}
                    </span>
                    {(!isCollapsed || isMobile) && <span>{group.groupTitle}</span>}
                  </div>
                  {!isCollapsed && (
                    <span className="ml-auto">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  )}
                </button>

                {/* Group Items */}
                {(!isCollapsed || isMobile) && isOpen && (
                  <div className="ml-6 mt-1 space-y-1">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.id}
                        to={item.Path}
                        className={`${linkStyle} ${isLinkActive(item.basePath || item.Path) ? activeStyle : ""}`}
                        onClick={() => {
                          closeAllGroups();
                          if (isMobile) setIsMobileOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 flex items-center justify-center">
                            {iconMap[item.pageKey]}
                          </span>
                          <span>{item.Title}</span>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-1 py-2 border-t border-border">
          <button
            onClick={() => {
              handleLogout();
              if (isMobile) setIsMobileOpen(false);
            }}
            className={`${linkStyle} w-full`}
            title={isCollapsed && !isMobile ? "Logout" : undefined}
          >
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 flex items-center justify-center">
                <LogOut />
              </span>
              {(!isCollapsed || isMobile) && <span>Logout</span>}
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
