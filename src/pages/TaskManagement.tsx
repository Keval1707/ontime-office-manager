import { useEffect, useState } from 'react';
import { TaskEntry, type TaskFormData, TaskStatusOptions } from '../components/data/Task';
import { ClientEntry } from "../components/data/Clints";
import { useToast } from "../hooks/useToast";
import TaskTable from '../components/Tables/TaskTable';
import Modal from '../components/Modal';
import TaskForm from '../components/Forms/TaskForm';
import { useParams,useNavigate } from 'react-router-dom';

const TaskManagement = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskFormData[]>(TaskEntry);
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
    if (taskId) {
    navigate("/tasks", { replace: true }); // remove `/newtask` or `/tasks/:id`
  }
  };
  const handleSubmit = (data: TaskFormData) => {
    setTasks(prev =>
      editingIndex !== null
        ? prev.map((task, idx) => (idx === editingIndex ? data : task))
        : [...prev, data]
    );
    toast(
      editingIndex !== null ? "success" : "success",
      editingIndex !== null ? "Task updated successfully ✅" : "Task added successfully ✅"
    );
    handleCloseModal();
  };
  const handleDelete = (index: number) => {
    const deleted = tasks[index];
    setTasks(prev => prev.filter((_, i) => i !== index));
    toast("error", `Deleted task: ${deleted.title}`);
  };

  const handleStatusChange = (index: number, newStatus: string) => {
    const updated = [...tasks];
    updated[index].status = newStatus;
    setTasks(updated);
    toast("info", `Lead status changed to "${newStatus}"`);
  };
  useEffect(() => {
    if (!taskId) return;

    if (taskId === "newtask") {
      openModal();
    } else {
      const index = tasks.findIndex((task) => task.title === taskId);
      if (index !== -1) openModal(index);
    }
  }, [taskId]);

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6 font-roboto">
      <div className="flex justify-end items-center">
        {/* <h1 className="text-2xl font-semibold">📋 Task Manager {taskId}</h1> */}
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      <TaskTable
        tasks={tasks}
        onEdit={openModal}
        onDelete={handleDelete}
        handleStatusChange={handleStatusChange}
        status={TaskStatusOptions}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingIndex !== null ? 'Edit Task' : 'Add Task'}
      >
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          initialData={editingIndex !== null ? tasks[editingIndex] : undefined}
          TaskStatusOptions={TaskStatusOptions}
          clientOptions={ClientEntry}
        />
      </Modal>
    </div>
  );
};

export default TaskManagement;
