// src/pages/Leads.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; // lib folder
import LeadCard from "../LeadCard"; // directly in src
import leadsEmptyImg from "../assets/leads.png"; // assets folder

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    setErrorMsg("");

    // Fetch leads from Supabase
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .limit(15);

    if (error) {
      console.error("Supabase error:", error);
      setLeads([]);
      setErrorMsg(error.message || "Failed to fetch leads");
    } else {
      setLeads(data || []);
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Inter, sans-serif" }}>
      <h1>Leads Page 📋</h1>

      {loading ? (
        <p>Loading leads...</p>
      ) : errorMsg ? (
        <p style={{ color: "red" }}>{errorMsg}</p>
      ) : leads.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <img
            src={leadsEmptyImg}
            alt="No leads"
            style={{ maxWidth: "300px" }}
          />
          <p>No leads found</p>
        </div>
      ) : (
        leads.map((lead, index) => <LeadCard key={index} lead={lead} />)
      )}
    </div>
  );
}
