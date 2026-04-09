import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qnkxrxxwfikhrlirfleg.supabase.co",
  "sb_publishable_exYuiUhOVuWEyPqROu4p5A_gCWtb89S"
);

export async function fetchRSSLeads() {
  try {
    // ⚠️ Replace later with real RSS feeds
    const rssUrl = "https://example.com/rss.xml";

    await fetch(rssUrl); // just to simulate call

    // TEMP leads (but now REAL DB insert)
    const leads = [
      {
        title: "Urgent: Need Arabic Teacher",
        description: "Looking for online Arabic teacher for kids",
        link: "https://example.com/arabic",
        tags: "Arabic"
      },
      {
        title: "Hiring Business Coach",
        description: "Startup needs part-time business coach",
        link: "https://example.com/coach",
        tags: "Business Coach"
      }
    ];

    // ✅ INSERT INTO SUPABASE
    const insertData = leads.map((lead) => ({
      client_name: lead.title,
      service_needed: lead.tags,
      description: lead.description,
      contact_email: null,
      contact_phone: null,
      skill: lead.tags,
      country: "Global",
      created_at: new Date().toISOString()
    }));

    const { error } = await supabase.from("demand_leads").insert(insertData);

    if (error) {
      console.error("RSS insert error:", error);
    }

    return leads;
  } catch (err) {
    console.error("RSS fetch error:", err);
    return [];
  }
}
