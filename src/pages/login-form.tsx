import { cn } from "@/lib/utils";
import { supabase } from "@/lib/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const adminEmail = import.meta.env.VITE_ADMINEMAIL;
const adminPass = import.meta.env.VITE_ADMINPASSWORD;
const userEmail = import.meta.env.VITE_USEREMAIL;
const userPass = import.meta.env.VITE_USERPASSWORD;

// Credential presets
const credentialsMap = {
  admin: {
    email: adminEmail,
    password: adminPass,
  },
  user: {
    email: userEmail,
    password: userPass,
  },
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAs, setLoginAs] = useState<"admin" | "user">("admin");

  // Auto-fill credentials on login type change
  useEffect(() => {
    const creds = credentialsMap[loginAs];
    setEmail(creds.email);
    setPassword(creds.password);
  }, [loginAs]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate("/dashboard");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 w-[350px] mx-auto", className)}
      {...props}
    >
      <Card className="border border-teal-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-teal-600 ">Login</CardTitle>
          <CardDescription>
            Choose a role and login with pre-filled credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              {/* Login As Dropdown */}
              <div className="grid gap-2">
                <Label htmlFor="login-as" className="text-teal-600">
                  Login As
                </Label>
                <select
                  id="login-as"
                  className="border rounded px-3 py-2 text-sm"
                  value={loginAs}
                  onChange={(e) =>
                    setLoginAs(e.target.value as "admin" | "user")
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-teal-600">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-teal-600">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-teal-600"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm text-teal-600">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
