// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/client";
// import { useUser } from "@/context/store";

// export default function useUserData() {
//   const { user } = useUser();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [admin, setAdmin] = useState(true);
//   const [allUserData, setAllUserData] = useState([]);
//   useEffect(() => {
//     if (!user?.userId) return;
//     console.log(user);

//     const fetchData = async () => {
//       setLoading(true);

//       const query =
//         user.role === "admin"
//           ? (setAdmin(true), supabase.from("loanDetails").select())
//           : (setAdmin(false),
//             supabase.from("loanDetails").select().eq("userId", user.userId));

//       const { data, error } = await query;

//       if (error) throw error;
//       if (data) {
//         setUserData(data);
//         if (user.role === "admin") {
//           const { data: users, error: userError } = await supabase
//             .from("users")
//             .select("*");
//           if (userError) throw userError;

//           if (users) {
//             const formattedData = users.map((item) => ({
//               ...item,
//               created_at: new Intl.DateTimeFormat("en-US", {
//                 dateStyle: "medium",
//                 timeStyle: "short",
//               }).format(new Date(item.created_at)),
//             }));
//             setAllUserData(formattedData);
//             console.log("All users data:", formattedData);
//           }
//         }
//         console.log("User data:", data);
//       }

//       setLoading(false);
//     };

//     fetchData();
//   }, [user?.userId]);

//   return { userData, loading, admin, allUserData };
// }
