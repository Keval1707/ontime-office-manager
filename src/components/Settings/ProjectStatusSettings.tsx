import StatusManager from "./StatusManager";

const ProjectStatusSettings = () => {
  const initial = [
    { name: "Planning", desc: "Initial planning phase" },
    { name: "Execution", desc: "Currently executing tasks" },
    { name: "Completed", desc: "Project is done" },
  ];

  return <StatusManager title="Project Status Settings" initialStatuses={initial} />;
};

export default ProjectStatusSettings;