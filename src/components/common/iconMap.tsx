import {
  LayoutDashboard,
  Users,
  ClipboardList,
  FolderKanban,
  IndianRupee,
  Settings,
  ShieldCheck,
  Bell,
  UserCog,
  FileSearch,
} from "lucide-react";
import type { JSX } from "react";

export const iconMap: Record<string, JSX.Element> = {
  LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  ClipboardList: <ClipboardList className="w-4 h-4" />,
  FolderKanban: <FolderKanban className="w-4 h-4" />,
  IndianRupee: <IndianRupee className="w-4 h-4" />,
  Settings: <Settings className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Bell: <Bell className="w-4 h-4" />,
  UserCog: <UserCog className="w-4 h-4" />,
  FileSearch: <FileSearch className="w-4 h-4" />,
};
