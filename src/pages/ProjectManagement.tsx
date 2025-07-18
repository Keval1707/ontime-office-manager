import { useState } from "react";
import { type ProjectFormData, ProjectEntrys } from "../components/data/Project";
import { ClientEntry } from "../components/data/Clints";
import ProjectTable from "../components/Tables/ProjectTable";
import Modal from "../components/Modal";
import { useToast } from "../hooks/useToast";
import ProjectForm from "../components/Forms/ProjectForm";

const ProjectManagement = () => {
  const [projects, setProjects] = useState<ProjectFormData[]>(ProjectEntrys);
  const toast = useToast();

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
    toast(
      editingIndex !== null ? "success" : "success",
      editingIndex !== null
        ? "Project updated successfully ✅"
        : "Project added successfully ✅"
    );

    handleCloseModal();

  };
  const handleDelete = (index: number) => {
    const deleted = projects[index];
    setProjects((prev) => prev.filter((_, i) => i !== index));
    toast("error", `Deleted project: ${deleted.title}`);
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
          client:
            ClientEntry.find((c) => c.id === Number(p.client))?.name || p.client,

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
          clientOptions={ClientEntry}
        />
      </Modal>
    </div>
  );
};

export default ProjectManagement;
