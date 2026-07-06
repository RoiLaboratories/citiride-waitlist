require("./env");

const { createClient } = require("@supabase/supabase-js");

let client;

function hasSupabaseConfig() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function getSupabaseClient() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  if (!client) {
    client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          persistSession: false,
        },
      },
    );
  }

  return client;
}

function getWaitlistTable() {
  return process.env.SUPABASE_WAITLIST_TABLE || "waitlist_entries";
}

function getNewsletterTable() {
  return process.env.SUPABASE_NEWSLETTER_TABLE || "newsletter_subscribers";
}

module.exports = {
  getNewsletterTable,
  getSupabaseClient,
  getWaitlistTable,
  hasSupabaseConfig,
};