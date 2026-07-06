import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function hasSupabaseConfig() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabaseClient() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  if (!client) {
    client = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
  }

  return client;
}

export function getWaitlistTable() {
  return process.env.SUPABASE_WAITLIST_TABLE || "waitlist_entries";
}

export function getNewsletterTable() {
  return process.env.SUPABASE_NEWSLETTER_TABLE || "newsletter_subscribers";
}