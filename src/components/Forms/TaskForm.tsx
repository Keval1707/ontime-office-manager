import { useState, useEffect, type ChangeEvent } from 'react';
import type{ TaskFormData ,TaskFormProps} from "../data/Task"

const TaskForm = ({
  onSubmit,
  initialData,
  onCancel,
  TaskStatusOptions = [],
  clientOptions = [],
}: TaskFormProps) => {
  const [form, setForm] = useState<TaskFormData>({
    title: '',
    description: '',
    deadline: '',
    priority: 'Medium',
    status: TaskStatusOptions.length > 0 ? TaskStatusOptions[0].status : '',
    relatedClient: '',
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'relatedClient' && clientOptions.length > 0) {
      const filtered = clientOptions
        .map((c) => c.name)
        .filter((name) =>
          name.toLowerCase().includes(value.toLowerCase())
        );
      setSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setForm((prev) => ({ ...prev, relatedClient: value }));
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="input"
        />

        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          required
          className="input"
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="input"
        >
          {['Low', 'Medium', 'High'].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="input"
        >
          {TaskStatusOptions.map((option) => (
            <option key={option.id} value={option.status}>
              {option.status}
            </option>
          ))}

        </select>

        <div className="relative md:col-span-2">
          <input
            type="text"
            name="relatedClient"
            value={form.relatedClient || ''}
            onChange={handleChange}
            placeholder="Related Client (optional)"
            className="input w-full"
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-border w-full mt-1 rounded shadow text-sm">
              {suggestions.map((name) => (
                <li
                  key={name}
                  onClick={() => handleSuggestionClick(name)}
                  className="px-3 py-1 cursor-pointer hover:bg-hover"
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
          className="md:col-span-2 input resize-none"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
