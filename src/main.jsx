// import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { LoginForm } from "./components/login-form";
import { SignUpForm } from "./components/sign-up-form";
import { ForgotPasswordForm } from "./components/forgot-password-form";
import { UpdatePasswordForm } from "./components/update-password-form";
import DashboardLayoutBranding from "./components/dashboard";
import { UserProvider } from "./context/store.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/update-password" element={<UpdatePasswordForm />} />
          <Route path="/dashboard" element={<DashboardLayoutBranding />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
