type Lead = {
  title: string;
  description: string;
  link: string;
  tags?: string;
};

// Simple in-memory cache for 4 hours
const cache: { [key: string]: { leads: Lead[]; timestamp: number } } = {};
const CACHE_DURATION = 1000 * 60 * 60 * 4; // 4 hours

export async function getCachedGoogleLeads(keywords: string[]): Promise<Lead[]> {
  const cacheKey = keywords.sort().join(',');

  // Return cached if not expired
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].leads;
  }

  try {
    // Replace with real Google SERP API call or scraping logic
    const leads: Lead[] = keywords.map((kw, i) => ({
      title: `Google Lead ${i + 1} - ${kw}`,
      description: `Sample description for ${kw}`,
      link: `https://example.com/google/${kw}`,
      tags: kw
    }));

    // Save to cache
    cache[cacheKey] = { leads, timestamp: Date.now() };
    return leads;
  } catch (err) {
    console.error('Google leads fetch error:', err);
    return [];
  }
}
