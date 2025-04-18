import { supabase } from "@/lib/client";

export default async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
