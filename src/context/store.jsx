import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/client";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      const publicRoutes = ["/login", "/sign-up", "/"];

      if (data?.user) {
        try {
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select()
            .eq("userId", data.user.id)
            .single();

          if (userError) throw userError;
          if (userData) {
            setUser(userData);
            if (publicRoutes.includes(location.pathname)) {
              navigate("/dashboard");
            }
          } else {
            if (!publicRoutes.includes(location.pathname)) {
              navigate("/login");
            }
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, [navigate, location]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
