import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/client";
import useLoanRealtime from "../lib/useLoanRealtime";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loanData, setLoanData] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useLoanRealtime({ table: "loanDetails", setData: setLoanData });
  useLoanRealtime({ table: "users", setData: setAllUsers });

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      const publicRoutes = ["/login", "/sign-up", "/", "/forgot-password"];

      if (!data?.user) {
        if (!publicRoutes.includes(location.pathname)) {
          navigate("/login");
        }
        setLoading(false);
        return;
      }

      setAuthUser(data.user);

      if (publicRoutes.includes(location.pathname)) {
        navigate("/dashboard");
      }

      setLoading(false);
    };

    checkAuth();
  }, [location, navigate]);

  useEffect(() => {
    if (!authUser) return;

    const fetchUserData = async () => {
      if (user?.userId === authUser.id) return;

      // Reset only when new user logs in
      setLoading(true);
      setUser(null);
      setLoanData([]);
      setAdmin(false);
      setAllUsers([]);

      try {
        const { data: userData, error } = await supabase
          .from("users")
          .select()
          .eq("userId", authUser.id)
          .single();

        if (error) throw error;
        if (userData) {
          setUser(userData);
          fetchLoanData(userData);
        }
      } catch (err) {
        console.error("Error fetching user data:", err.message);
      }
    };

    const fetchLoanData = async (userData) => {
      try {
        if (userData.role === "admin") {
          setAdmin(true);
          const { data, error } = await supabase.from("loanDetails").select();
          if (error) throw error;
          setLoanData(data);

          const { data: users, error: userError } = await supabase
            .from("users")
            .select("*");
          if (userError) throw userError;
          if (users) {
            const formattedData = users.map((item) => ({
              ...item,
              created_at: new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(item.created_at)),
            }));
            setAllUsers(formattedData);
          }
        } else {
          setAdmin(false);
          const { data, error } = await supabase
            .from("loanDetails")
            .select()
            .eq("userId", userData.userId);
          if (error) throw error;
          setLoanData(data);
        }
      } catch (err) {
        console.error("Error fetching loan data:", err.message);
      }
      setLoading(false);
    };

    fetchUserData();
  }, [authUser]);

  return (
    <UserContext.Provider
      value={{ user, authUser, loading, setUser, loanData, admin, allUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
