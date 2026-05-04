async function fetchLeads() {
  setLoading(true);
  setErrorMsg("");

  try {
    // TEMP SAFE FALLBACK DATA
    const data = [
      { title: "Demo Lead 1" },
      { title: "Demo Lead 2" },
    ];

    setLeads(data);
  } catch (err: any) {
    console.error("Error:", err.message);
    setLeads([]);
    setErrorMsg("Something went wrong");
  } finally {
    setLoading(false);
  }
}
