import { useMemo, useState } from 'react';
import type { TaskFormData } from '../Forms/TaskForm';

interface Props {
  tasks: TaskFormData[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const statusColor = {
  'Pending': 'text-yellow-600',
  'In Progress': 'text-blue-600',
  'Done': 'text-green-600',
  'Archived': 'text-gray-400',
};

const priorityBadge = {
  'Low': 'bg-green-100 text-green-700',
  'Medium': 'bg-yellow-100 text-yellow-700',
  'High': 'bg-red-100 text-red-700',
};

const TaskTable = ({ tasks, onEdit, onDelete }: Props) => {
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [view, setView] = useState<'table' | 'daily' | 'calendar'>('table');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task =>
      (task.title + task.description + task.relatedClient)
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (!priorityFilter || task.priority === priorityFilter) &&
      (!statusFilter || task.status === statusFilter) &&
      (!dateFilter || task.deadline === dateFilter)
    );
  }, [tasks, search, priorityFilter, statusFilter, dateFilter]);

  const today = new Date().toISOString().split('T')[0];
  const dailyTasks = filteredTasks.filter(task => task.deadline === today);

  const groupedByDate = useMemo(() => {
    const groups: Record<string, TaskFormData[]> = {};
    filteredTasks.forEach(task => {
      (groups[task.deadline] = groups[task.deadline] || []).push(task);
    });
    return groups;
  }, [filteredTasks]);

  return (
    <div className="space-y-4">
      {/* Toggle and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-2">
          {['table', 'daily', 'calendar'].map(v => (
            <button
              key={v}
              onClick={() => setView(v as any)}
              className={`px-3 py-1 rounded ${view === v ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {v[0].toUpperCase() + v.slice(1)} View
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded px-3 py-2 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">All Priorities</option>
            {['Low', 'Medium', 'High'].map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="">All Statuses</option>
            {['Pending', 'In Progress', 'Done', 'Archived'].map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {/* <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          /> */}
        </div>
      </div>

      {/* Table View */}
      {view === 'table' && (
        <div className="overflow-x-auto rounded-md border">
          <table className="min-w-full text-sm text-left bg-white">
            <thead className="bg-gray-50">
              <tr className="text-xs text-gray-600 uppercase tracking-wider">
                {['Title', 'Deadline', 'Priority', 'Status', 'Client', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length ? filteredTasks.map((t, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{t.title}</td>
                  <td className="px-4 py-2">{t.deadline}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityBadge[t.priority]}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`font-medium ${statusColor[t.status]}`}>{t.status}</span>
                  </td>
                  <td className="px-4 py-2">{t.relatedClient || '-'}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => onEdit(i)} className="text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => onDelete(i)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-4">No tasks available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Daily View */}
      {view === 'daily' && (
        <div className="bg-white rounded-md shadow p-4 border">
          <h2 className="text-lg font-semibold mb-2">📅 Tasks for Today ({today})</h2>
          {dailyTasks.length ? dailyTasks.map((t, i) => (
            <div key={i} className="p-3 border-b last:border-b-0">
              <div className="font-medium">{t.title}</div>
              <div className="text-sm text-gray-500">{t.description}</div>
              <div className="text-xs mt-1">
                <span className={`${priorityBadge[t.priority]} px-2 py-1 rounded mr-2`}>{t.priority}</span>
                <span className={statusColor[t.status]}>{t.status}</span>
              </div>
            </div>
          )) : <p className="text-gray-500">No tasks for today.</p>}
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="bg-white rounded-md shadow p-4 border space-y-4">
          <h2 className="text-lg font-semibold mb-2">📆 Calendar View</h2>
          {Object.keys(groupedByDate).sort().map(date => (
            <div key={date} className="border rounded p-3">
              <h3 className="font-semibold text-sm text-blue-700">{date}</h3>
              <ul className="mt-2 space-y-1">
                {groupedByDate[date].map((task, idx) => (
                  <li key={idx} className="text-sm flex justify-between">
                    <span>{task.title}</span>
                    <span className={`text-xs ${priorityBadge[task.priority]}`}>{task.priority}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {Object.keys(groupedByDate).length === 0 && (
            <p className="text-gray-500">No tasks found for any date.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskTable;
