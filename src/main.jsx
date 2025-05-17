import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginForm } from "./pages/login-form";
import { SignUpForm } from "./pages/sign-up-form";
import { ForgotPasswordForm } from "./pages/forgot-password-form";
import { UpdatePasswordForm } from "./pages/update-password-form";
import DashboardLayoutBranding from "./pages/dashboard";
import NotFound from "./pages/notFound";
import { UserProvider } from "./context/store.jsx";
import "./index.css";
import "./app.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./lib/theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/update-password" element={<UpdatePasswordForm />} />
            <Route path="/dashboard" element={<DashboardLayoutBranding />} />
            <Route
              path="/Loan-Requests"
              element={<DashboardLayoutBranding />}
            />
            <Route
              path="/My-Loan-Requests"
              element={<DashboardLayoutBranding />}
            />
            <Route path="/New-Loan" element={<DashboardLayoutBranding />} />
            <Route path="/users" element={<DashboardLayoutBranding />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
