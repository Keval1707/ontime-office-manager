import { useState } from 'react';
import TaskForm, { type TaskFormData } from '../components/Forms/TaskForm';
import TaskTable from '../components/Tables/TaskTable';
import Modal from '../components/Modal';

export const clientOptions = [
  { id: "1", name: "Keval" },
  { id: "2", name: "Keval Satani" },
];
const TaskManagement = () => {
  const [tasks, setTasks] = useState<TaskFormData[]>([
    {
      title: 'Fix Landing Page',
      description: 'Improve mobile responsiveness',
      deadline: '2025-08-01',
      priority: 'High',
      status: 'Pending',
      relatedClient: 'Keval',
    },
    {
      title: 'Update Logo',
      description: 'Client requested new branding',
      deadline: '2025-08-05',
      priority: 'Medium',
      status: 'In Progress',
      relatedClient: 'Keval Satani',
    }
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

  const handleSubmit = (data: TaskFormData) => {
    setTasks(prev =>
      editingIndex !== null
        ? prev.map((task, idx) => (idx === editingIndex ? data : task))
        : [...prev, data]
    );
    handleCloseModal();
  };

  const handleDelete = (index: number) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6 font-roboto">
      <div className="flex justify-end items-center">
        {/* <h1 className="text-2xl font-semibold">📋 Task Manager</h1> */}
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      <TaskTable tasks={tasks} onEdit={openModal} onDelete={handleDelete} />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingIndex !== null ? 'Edit Task' : 'Add Task'}
      >
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          initialData={editingIndex !== null ? tasks[editingIndex] : undefined}
          TaskStatusOptions={['Pending', 'In Progress', 'Done']}
          clientOptions={clientOptions}
        />
      </Modal>
    </div>
  );
};

export default TaskManagement;
