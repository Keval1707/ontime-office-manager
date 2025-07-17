import { useLocation, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface NavbarProps {
  onSidebarToggle: () => void;
}

const Navbar = ({ onSidebarToggle }: NavbarProps) => {
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getPageTitle = (pathname: string): string => {
    if (pathname.startsWith("/clients")) return "Clients";
    if (pathname.startsWith("/tasks")) return "Tasks";
    if (pathname.startsWith("/settings")) return "Settings";
    if (pathname === "/") return "Dashboard";
    return "MyApp";
  };

  const pageTitle = getPageTitle(location.pathname);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-background border-b border-border px-layout py-3 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center justify-between">
        <button
          onClick={onSidebarToggle}
          className="lg:hidden text-muted hover:text-text"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="text-title font-bold text-text">
          {pageTitle}
        </div>

        <div
          className="relative"
          ref={dropdownRef}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="focus:outline-none"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border border-border"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-text border border-border rounded shadow-md z-50 animate-fadeIn">
              <ul className="py-1">
                <li>
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 hover:bg-surface transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className="block px-4 py-2 hover:bg-surface transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </NavLink>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-surface transition"
                    onClick={() => {
                      console.log("Logout clicked");
                      setDropdownOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
