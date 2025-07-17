import StatusManager from "./StatusManager";

const TaskStatusSettings = () => {
  const initial = [
    { name: "Pending", desc: "Waiting to be started" },
    { name: "In Progress", desc: "Work is ongoing" },
    { name: "Done", desc: "Completed task" },
  ];

  return <StatusManager title="Task Status Settings" initialStatuses={initial} />;
};

export default TaskStatusSettings;
