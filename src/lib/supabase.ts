// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qnkxrxxwfikhrlirfleg.supabase.co";
const supabaseKey = "sb_publishable_exYuiUhOVuWEyPqROu4p5A_gCWtb89S";

export const supabase = createClient(supabaseUrl, supabaseKey);
