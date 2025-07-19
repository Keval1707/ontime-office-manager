import { useLocation } from "react-router-dom";
import SettingPanel from "../components/Settings/SettingPane";

const Settings = () => {
  const location = useLocation();


  return (
    <div className="p-6">
      <SettingPanel type={location.pathname.replace("/settings/", "") || "invalid"} />
    </div>
  );
};

export default Settings;
