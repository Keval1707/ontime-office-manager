import { Pencil, Trash2 } from "lucide-react";
import type { ProjectTableProps } from "../data/Project";

const ProjectTable = ({ projects, onEdit, onDelete }: ProjectTableProps) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-border animation-fadeIn">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-surface text-muted text-left text-sm font-medium">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Start</th>
            <th className="px-4 py-3">End</th>
            <th className="px-4 py-3">Progress</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-sm text-text">
          {projects.length ? (
            projects.map((p, i) => (
              <tr key={i} className="hover:bg-surface transition">
                <td className="px-4 py-2">{p.title}</td>
                <td className="px-4 py-2">{p.client}</td>
                <td className="px-4 py-2">{p.startDate}</td>
                <td className="px-4 py-2">{p.endDate}</td>
                <td className="px-4 py-2">{p.progress}%</td>
                <td className="px-4 py-2">{p.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => onEdit(i)} className="text-blue-600 hover:text-blue-800"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => onDelete(i)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={7} className="text-center text-muted py-4">No projects available.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
