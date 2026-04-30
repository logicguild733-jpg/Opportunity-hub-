import { useAuthMe } from "./hooks/use-auth";
import { useLeads } from "./hooks/use-leads";

export default function Dashboard() {
  const { data: user, isLoading: userLoading } = useAuthMe();
  const { data: leadsData, isLoading: leadsLoading } = useLeads();

  if (userLoading || leadsLoading) {
    return (
      <div className="p-6">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <h2>Not logged in</h2>
      </div>
    );
  }

  const leads = leadsData?.leads || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name || "User"} 👋</h1>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Your Leads</h2>

        {leads.length === 0 ? (
          <p className="mt-2 text-gray-500">No leads available</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {leads.map((lead: any, index: number) => (
              <li key={index} className="p-3 border rounded">
                {lead.title || "Untitled Lead"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
