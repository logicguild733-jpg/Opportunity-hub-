import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { token } = req.query;
  const { name, password, phone } = req.body;

  const { data: invite } = await supabase
    .from("allowed_users")
    .select("*")
    .eq("invite_code", token)
    .eq("is_active", true)
    .single();

  if (!invite) {
    return res.status(403).json({ error: "Invalid invite" });
  }

  const { data: user, error } = await supabase
    .from("users")
    .insert({
      email: invite.email,
      name,
      password,
      phone,
      plan: invite.plan,
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  await supabase
    .from("allowed_users")
    .update({ is_active: false })
    .eq("invite_code", token);

  return res.json({
    success: true,
    user,
  });
}
