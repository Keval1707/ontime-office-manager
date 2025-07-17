import { useState } from 'react';
import TaskForm, { type TaskFormData } from '../components/Forms/TaskForm';
import TaskTable from '../components/Tables/TaskTable';

const Temp = () => {
    const [tasks, setTasks] = useState<TaskFormData[]>([
        { title: 'Fix Landing Page', description: 'Improve mobile responsiveness', deadline: '2025-08-01', priority: 'High', status: 'Pending', relatedClient: 'TechCorp' },
        { title: 'Update Logo', description: 'Client requested new branding', deadline: '2025-08-05', priority: 'Medium', status: 'In Progress', relatedClient: 'DesignX' }
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const openModal = (index: number | null = null) => {
        setEditingIndex(index);
        setIsModalOpen(true);
    };

    const handleSubmit = (data: TaskFormData) => {
        setTasks(prev => editingIndex !== null
            ? prev.map((t, i) => i === editingIndex ? data : t)
            : [...prev, data]
        );
        setIsModalOpen(false);
        setEditingIndex(null);
    };

    const handleDelete = (index: number) => {
        setTasks(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4 max-w-6xl mx-auto space-y-6 font-roboto">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">📋 Task Manager</h1>
                <button onClick={() => openModal()} className="btn-primary">+ Add Task</button>
            </div>

            <TaskTable tasks={tasks} onEdit={openModal} onDelete={handleDelete} />

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-4 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white w-full max-w-2xl rounded-lg p-6 shadow-xl relative">
                        <button className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600" onClick={() => setIsModalOpen(false)}>&times;</button>
                        <TaskForm
                            onSubmit={handleSubmit}
                            initialData={editingIndex !== null ? tasks[editingIndex] : undefined}
                            onCancel={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Temp;
