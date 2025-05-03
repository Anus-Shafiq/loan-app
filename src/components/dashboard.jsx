import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { Button } from "@mui/material";
import DataTable from "./table";
import { supabase } from "@/lib/client";
import { useNavigate } from "react-router-dom";
import LoanStepperForm from "./steppers";
import DashboardData from "./dashboarddata";
import useUserData from "../lib/user";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {pathname === "/My-Loan-Requests" || pathname === "/Loan-Requests" ? (
        <DataTable />
      ) : pathname === "/New-Loan" ? (
        <LoanStepperForm />
      ) : pathname === "/dashboard" ? (
        <DashboardData />
      ) : pathname === "/Profile" ? (
        <Typography>Dashboard content for {pathname}</Typography>
      ) : (
        <Typography>Dashboard content for {pathname}</Typography>
      )}
    </Box>
  );
}

const SidebarFooterAccount = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <Button
      onClick={handleLogout}
      variant="text"
      size="large"
      endIcon={<LogoutIcon />}
    >
      Log Out
    </Button>
  );
};

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
  const { userData, loading, admin } = useUserData();

  const NAVIGATION = [
    {
      segment: "dashboard",
      title: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      segment: admin ? "Loan-Requests" : "My-Loan-Requests",
      title: admin ? "Loan Requests" : "My Loan Requests",
      icon: <DescriptionIcon />,
    },
    {
      segment: "New-Loan",
      title: "New Loan",
      icon: <AddCircleIcon />,
    },
    {
      segment: "Profile",
      title: "Profile",
      icon: <PersonIcon />,
    },
  ];

  const { window } = props;

  const router = useDemoRouter("/dashboard");

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "Loan Lelo",
        homeUrl: "/toolpad/core/introduction",
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: SidebarFooterAccount,
        }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

DashboardLayoutBranding.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutBranding;
