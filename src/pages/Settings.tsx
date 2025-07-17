import { useParams } from "react-router-dom";
import SettingPanel from "../components/Settings/SettingPane";

const SettingsPage = () => {
  const { settingType = "projectStatus" } = useParams(); // fallback to projectStatus

  return (
    <div className="p-6 fadeIn flex flex-col lg:flex-row gap-6">
      <SettingPanel type={settingType} />
    </div>
  );
};

export default SettingsPage;
