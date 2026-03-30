import express from 'express';
import { fetchRSSLeads } from '../services/rssLeads';
import { getCachedGoogleLeads } from '../services/googleLeads';

const router = express.Router();

// Plan limits
const PLAN_LIMITS = { basic: 15, premium: 30, gold: Infinity };

// Skill keywords
const SKILL_GROUPS = {
  teaching: ["quran_teacher","arabic_teacher","english_teacher","urdu_teacher","language_teacher","teacher"],
  coaching: ["business_coach","career_coach","self_help_coach"],
  freelance: ["freelancer","developer","designer","writer","video_editor","digital_marketing"]
};

const ALL_SKILLS = [].concat(...Object.values(SKILL_GROUPS));

function matchLeadKeywords(lead: any, userSkills: string[]) {
  const content = (lead.title + ' ' + lead.description + ' ' + (lead.tags || '')).toLowerCase();
  const keywords = ALL_SKILLS.filter(skill => userSkills.includes(skill));
  return keywords.some(k => content.includes(k.toLowerCase()));
}

router.get('/', async (req, res) => {
  try {
    const user = req.user || {}; // auth middleware should fill this
    const userSkills = user.skills || ['teacher'];
    const userPlan = user.plan || 'basic';

    const rssLeads = await fetchRSSLeads();
    const googleLeads = await getCachedGoogleLeads(userSkills);

    const allLeads = [...rssLeads, ...googleLeads];
    const uniqueLeads = allLeads.filter((v,i,a) => a.findIndex(t => t.link===v.link)===i);

    const matchedLeads = uniqueLeads.filter(lead => matchLeadKeywords(lead, userSkills));
    const maxLeads = PLAN_LIMITS[userPlan] || PLAN_LIMITS.basic;
    const unlocked = matchedLeads.slice(0, maxLeads);
    const locked = matchedLeads.slice(maxLeads).map(l => ({ ...l, isLocked: true }));

    let finalLeads = [...unlocked, ...locked];
    if(finalLeads.length === 0) {
      finalLeads = (await fetchRSSLeads()).slice(0, 10).map(l => ({ ...l, isLocked: false }));
    }

    res.json(finalLeads);
  } catch (err) {
    console.error('Leads endpoint error:', err.message);
    res.json([]);
  }
});

export default router;
