// src/pages/Home.tsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "20px", fontFamily: "Inter, sans-serif" }}>
      <h1>Opportunity Hub 🏠</h1>
      <p>Welcome to your SaaS dashboard!</p>
      <ul>
        <li>
          <Link to="/leads">View Leads 📋</Link>
        </li>
      </ul>
    </div>
  );
}
