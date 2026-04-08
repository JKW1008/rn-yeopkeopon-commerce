import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANNON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnnonKey);