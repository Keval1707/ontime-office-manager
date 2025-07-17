import { useState } from "react";
import ProjectForm, { type ProjectFormData } from "../components/Forms/ProjectForm";
import ProjectTable from "../components/Tables/ProjectTable";
import Modal from "../components/Modal";

const clientOptions = [
  { id: "1", name: "Keval" },
  { id: "2", name: "Keval Satani" },
];

const ProjectManagement = () => {
  const [projects, setProjects] = useState<ProjectFormData[]>([
    {
      title: "Website Redesign",
      client: "1",
      startDate: "2025-07-01",
      endDate: "2025-07-31",
      progress: 45,
      status: "Ongoing",
      notes: "Focus on responsive design and performance.",
    },
    {
      title: "Mobile App Launch",
      client: "2",
      startDate: "2025-06-15",
      endDate: "2025-08-15",
      progress: 80,
      status: "Paused",
      notes: "Awaiting client feedback on beta version.",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const openModal = (index: number | null = null) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleSubmit = (data: ProjectFormData) => {
    setProjects((prev) =>
      editingIndex !== null
        ? prev.map((p, i) => (i === editingIndex ? data : p))
        : [...prev, data]
    );
    handleCloseModal();
  };

  const handleDelete = (index: number) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center">
        {/* <h1 className="text-title font-bold">Project Management</h1> */}
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-hover text-white rounded shadow hover:bg-gray-900"
        >
          Add Project
        </button>
      </div>

      <ProjectTable
        projects={projects.map((p) => ({
          ...p,
          client: clientOptions.find((c) => c.id === p.client)?.name || p.client,
        }))}
        onEdit={openModal}
        onDelete={handleDelete}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingIndex !== null ? "Edit Project" : "Add Project"}>
        <ProjectForm
          defaultValues={editingIndex !== null ? projects[editingIndex] : undefined}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          statusOptions={["Ongoing", "Paused", "Completed"]}
          clientOptions={clientOptions}
        />
      </Modal>
    </div>
  );
};

export default ProjectManagement;
