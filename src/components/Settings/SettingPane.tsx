import TaskStatusSettings from "./TaskStatusSettings";
import ProjectStatusSettings from "./ProjectStatusSettings";
interface Props {
    type: string;
}

const SettingPanel = ({ type }: Props) => {
    const renderContent = () => {
        switch (type) {
            case "projectStatus":
                return <ProjectStatusSettings />;
            case "taskStatus":
                return <TaskStatusSettings />;
            case "userRoles":
                return <div>User Roles Settings</div>;
            case "notifications":
                return <div>Notification Settings</div>;
            default:
                return <div className="text-red-600 font-semibold">Invalid setting selected {type}</div>;
        }
    };

    return (
        <div className="flex-1 bg-surface p-6 rounded-xl shadow-md animation-fadeIn">
            {renderContent()}
        </div>
    );
};

export default SettingPanel;
