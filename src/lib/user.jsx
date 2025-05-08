import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";
import { useUser } from "@/context/store";

export default function useUserData() {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(true);
  useEffect(() => {
    if (!user) return;
    console.log(user);

    const fetchData = async () => {
      setLoading(true);

      const query =
        user.role === "admin"
          ? (setAdmin(true), supabase.from("loanDetails").select())
          : (setAdmin(false),
            supabase.from("loanDetails").select().eq("userId", user.userId));

      const { data, error } = await query;

      if (error) throw error;
      if (data) {
        setUserData(data);
        console.log("User data:", data);
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  return { userData, loading, admin };
}
