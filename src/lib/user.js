import { supabase } from "@/lib/client";

export default async function getUserData() {
  try {
    const { data, error } = await supabase.from("loanDetails").select();

    if (error) {
      return { success: false, message: error };
    }

    if (data) {
      console.log(data);
      return {
        success: true,
        data: data,
        message: "User list succesfully Fetch",
      };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
