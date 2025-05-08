import { useEffect } from "react";
import { supabase } from "@/lib/client";

export default function useLoanRealtime(setUsersData) {
  useEffect(() => {
    const channel = supabase
      .channel("loanDetails-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "loanDetails" },
        (payload) => {
          setUsersData((prev) => {
            if (payload.eventType === "INSERT") {
              return [...prev, payload.new];
            } else if (payload.eventType === "UPDATE") {
              return prev.map((user) =>
                user.id === payload.new.id ? payload.new : user
              );
            } else if (payload.eventType === "DELETE") {
              return prev.filter((user) => user.id !== payload.old.id);
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setUsersData]);
}
