// src/pages/Dashboard.tsx
const Dashboard = () => {
  return (
    <div className="bg-surface p-layout font-roboto text-text space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-muted">👋 Hello, John! Here's your workspace summary.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Tasks', value: 24 },
          { label: 'Ongoing Projects', value: 3 },
          { label: 'Pending Reviews', value: 5 },
          { label: 'Clients', value: 7 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-4 rounded-lg shadow-sm border border-border"
          >
            <p className="text-muted text-sm">{stat.label}</p>
            <p className="text-title font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Projects and Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="lg:col-span-2">
          <h2 className="text-subtitle font-semibold mb-4">🧩 Active Projects</h2>
          <div className="bg-white rounded-lg border border-border overflow-hidden">
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
                  {
                    title: 'Website Redesign',
                    client: 'Acme Corp',
                    progress: '45%',
                    status: 'Ongoing',
                  },
                  {
                    title: 'App Development',
                    client: 'Globex Ltd',
                    progress: '80%',
                    status: 'Paused',
                  },
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

        {/* Deadlines */}
        <div>
          <h2 className="text-subtitle font-semibold mb-4">📅 Upcoming Deadlines</h2>
          <ul className="bg-white rounded-lg border border-border divide-y divide-border">
            {[
              { title: 'Fix Landing Page', due: '2025-08-01' },
              { title: 'Submit Logo Design', due: '2025-08-05' },
              { title: 'Beta Testing Report', due: '2025-08-10' },
            ].map((item, idx) => (
              <li key={idx} className="p-4">
                <p className="font-medium">{item.title}</p>
                <p className="text-muted text-sm">Due: {item.due}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Client Overview */}
      <div>
        <h2 className="text-subtitle font-semibold mb-4">👥 Client Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {['Acme Corp', 'Globex Ltd', 'DesignX', 'TechCorp'].map((client, idx) => (
            <div
              key={idx}
              className="bg-white border border-border p-4 rounded-lg shadow-sm text-center"
            >
              <p className="font-medium">{client}</p>
              <p className="text-muted text-sm">Active</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
