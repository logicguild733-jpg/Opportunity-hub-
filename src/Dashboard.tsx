type Lead = {
  title: string;
};

export default function Dashboard() {
  // TEMP FAKE DATA (so UI always works)
  const user = { name: "Demo User" };

  const leads: Lead[] = [
    { title: "Sample Lead 1" },
    { title: "Sample Lead 2" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome, {user.name} 👋
      </h1>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Your Leads</h2>

        {leads.length === 0 ? (
          <p className="mt-2 text-gray-500">No leads available</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {leads.map((lead, index) => (
              <li key={index} className="p-3 border rounded">
                {lead.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
