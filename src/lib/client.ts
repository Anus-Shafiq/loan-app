import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  return createSupabaseClient(
    "https://ybzqmfldjtvymgrnghdg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlienFtZmxkanR2eW1ncm5naGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMDQ5NTIsImV4cCI6MjA1OTc4MDk1Mn0.2KFKVBXvVkufeIPL8e2k6MPwyNTryjjXBke8gbbCia8"
  );
}
