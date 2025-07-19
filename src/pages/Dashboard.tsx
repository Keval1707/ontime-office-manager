
import { NavLink } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import {usename} from "../utils/auth"


const Dashboard = () => {
  const taskData = [
    { date: 'Jul 1', completed: 3, pending: 2, other: 1 },
    { date: 'Jul 5', completed: 4, pending: 3, other: 1 },
    { date: 'Jul 10', completed: 2, pending: 3, other: 1 },
    { date: 'Jul 15', completed: 6, pending: 2, other: 2 },
    { date: 'Jul 18', completed: 5, pending: 1, other: 1 },
  ];

  const projectProgress = [
    { client: 'Acme Corp', progress: 45 },
    { client: 'Globex Ltd', progress: 80 },
    { client: 'DesignX', progress: 65 },
    { client: 'TechCorp', progress: 30 },
  ];

  return (
    <div className="bg-surface p-layout font-roboto text-text space-y-10 animate-fadeIn">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-title font-bold text-2xl mb-1">👋 Welcome back, {usename()}!</h1>
          <p className="text-muted text-sm">Here’s what’s happening with your workspace today.</p>
        </div>
        <div className="flex gap-3">
          <NavLink
            to="/projects/newproject"
            className="bg-primary text-muted hover:bg-primary/90 px-5 py-2 rounded-xl text-sm font-medium shadow transition duration-200"
          >
            + New Project
          </NavLink>
          <NavLink
            to="/tasks/newtask"
            className="border border-border text-text hover:bg-surface px-5 py-2 rounded-xl text-sm font-medium transition duration-200"
          >
            + New Task
          </NavLink>

        </div>
      </div>


      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Tasks', value: 24 },
          { label: 'Ongoing Projects', value: 3 },
          { label: 'Pending Reviews', value: 5 },
          { label: 'Clients', value: 7 },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-2xl shadow border border-border flex flex-col gap-2">
            <span className="text-muted text-sm">{stat.label}</span>
            <span className="text-title font-semibold text-lg">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Over Time */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-subtitle font-semibold">📈 Tasks Over Time</h2>
            <span className="text-muted text-sm">Last 30 Days</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={taskData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ fontSize: '14px', borderRadius: '0.5rem' }} labelStyle={{ color: '#6b7280' }} />
              <Legend wrapperStyle={{ paddingTop: 10 }} iconType="circle" formatter={(value) => <span className="text-sm text-muted">{value.charAt(0).toUpperCase() + value.slice(1)}</span>} />
              <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Completed" />
              <Line type="monotone" dataKey="pending" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Pending" />
              <Line type="monotone" dataKey="other" stroke="#a78bfa" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Other" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Project Progress */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <h2 className="text-subtitle font-semibold mb-4">📊 Project Progress</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={projectProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="client" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend iconType="circle" />
              <Bar dataKey="progress" fill="#34d399" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Projects Table */}
      <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
        <h2 className="text-subtitle font-semibold mb-4">🧩 Active Projects</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-surface text-muted border-b border-border">
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Client</th>
                <th className="text-left p-3">Progress</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'Website Redesign', client: 'Acme Corp', progress: '45%', status: 'Ongoing' },
                { title: 'App Development', client: 'Globex Ltd', progress: '80%', status: 'Paused' },
              ].map((project, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-surface">
                  <td className="p-3">{project.title}</td>
                  <td className="p-3">{project.client}</td>
                  <td className="p-3">{project.progress}</td>
                  <td className="p-3">{project.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deadlines & Client Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Deadlines */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <h2 className="text-subtitle font-semibold mb-4">📅 Upcoming Deadlines</h2>
          <ul className="divide-y divide-border">
            {[
              { title: 'Fix Landing Page', due: '2025-08-01' },
              { title: 'Submit Logo Design', due: '2025-08-05' },
              { title: 'Beta Testing Report', due: '2025-08-10' },
            ].map((item, idx) => (
              <li key={idx} className="py-3">
                <p className="font-medium text-text">{item.title}</p>
                <p className="text-muted text-sm">Due: {item.due}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Client Overview */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <h2 className="text-subtitle font-semibold mb-4">👥 Client Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {['Acme Corp', 'Globex Ltd', 'DesignX', 'TechCorp'].map((client, idx) => (
              <div key={idx} className="bg-surface border border-border p-4 rounded-lg shadow-sm text-center">
                <p className="font-medium text-text">{client}</p>
                <p className="text-muted text-xs">Active</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
