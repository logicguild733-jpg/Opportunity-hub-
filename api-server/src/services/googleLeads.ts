import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qnkxrxxwfikhrlirfleg.supabase.co",
  "sb_publishable_exYuiUhOVuWEyPqROu4p5A_gCWtb89S"
);

type Lead = {
  title: string;
  description: string;
  link: string;
  tags?: string;
};

// Simple cache
const cache: { [key: string]: { leads: Lead[]; timestamp: number } } = {};
const CACHE_DURATION = 1000 * 60 * 60 * 4; // 4 hours

export async function getCachedGoogleLeads(keywords: string[]): Promise<Lead[]> {
  const cacheKey = keywords.sort().join(",");

  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].leads;
  }

  try {
    // ⚠️ TEMP: still mock, but now we SAVE to Supabase
    const leads: Lead[] = keywords.map((kw, i) => ({
      title: `Need ${kw} expert urgently`,
      description: `Client is looking for ${kw} service`,
      link: `https://example.com/${kw}`,
      tags: kw
    }));

    // ✅ INSERT INTO SUPABASE (IMPORTANT)
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
      console.error("Insert error:", error);
    }

    // Save to cache
    cache[cacheKey] = { leads, timestamp: Date.now() };

    return leads;
  } catch (err) {
    console.error("Google leads fetch error:", err);
    return [];
  }
}
