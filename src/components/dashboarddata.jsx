import useUserData from "../lib/user";
import { useEffect, useState, useMemo } from "react";
import { useUser } from "@/context/store";
import useLoanRealtime from "../lib/useLoanRealtime";
import { Grid, Box, Typography } from "@mui/material";

import CardSection from "./card";

import {
  red,
  purple,
  pink,
  deepPurple,
  green,
  orange,
  blue,
} from "@mui/material/colors";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { PuffLoader, PulseLoader } from "react-spinners";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import LinearProgress from "@mui/material/LinearProgress";

export default function DashboardData() {
  const { userData, admin } = useUserData();
  const [allData, setAllData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [statusCounts, setStatusCounts] = useState({});
  const { user, loading } = useUser();

  useLoanRealtime(setAllData);

  // useEffect(() => {
  //   if (userData?.length) {
  //     setAllData(userData);
  //     setLoading(false);
  //   }
  // }, [userData]);

  useEffect(() => {
    if (userData) {
      setAllData(userData);
      setLoading(false); // ✅ set loading false once you have data, even if empty
    }
  }, [userData]);

  useEffect(() => {
    if (allData.length) {
      setTotal(allData.length);

      const counts = {};
      allData.forEach((item) => {
        const status = item.status?.toLowerCase() || "unknown";
        counts[status] = (counts[status] || 0) + 1;
      });

      setStatusCounts(counts);
    }
  }, [allData]);

  const totals = useMemo(
    () =>
      allData.reduce(
        (acc, item) => {
          if (item.status === "approved") acc.approved += item.loanAmount;
          else if (item.status === "rejected") acc.rejected += item.loanAmount;
          else if (item.status === "pending") acc.pending += item.loanAmount;
          return acc;
        },
        { approved: 0, rejected: 0, pending: 0 }
      ),
    [allData]
  );

  console.log(totals);

  const pieChartData = Object.entries(statusCounts).map(
    ([status, count], index) => {
      const label = status.charAt(0).toUpperCase() + status.slice(1);
      let color = "#9e9e9e"; // default gray

      switch (status.toLowerCase()) {
        case "approved":
          color = green[500];
          break;
        case "pending":
          color = orange[500]; // orange
          break;
        case "rejected":
          color = red[500]; // red
          break;
      }

      return {
        id: index,
        value: count,
        label,
        color,
      };
    }
  );

  if (total) {
    pieChartData.push({
      id: pieChartData.length,
      value: total,
      label: "Total",
      color: blue[500], // blue
    });
  }

  console.log(allData);

  if (isLoading || loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "80%" }}>
          <LinearProgress />
        </Box>
      </Box>
    );
  }
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },

          width: "95%",
          bgcolor: "#b2ebf2",
          borderRadius: 6,
          padding: 2,
          textAlign: "start",
          textTransform: "capitalize",
          display: "flex",
          alignItems: "center",
        }}
      >
        {admin ? (
          "Hello Admin!"
        ) : user ? (
          `Hello ${user.email}!`
        ) : (
          <PulseLoader size={20} margin={10} />
        )}
      </Typography>
      <Grid container spacing={3} sx={{ width: "95%" }}>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
          <CardSection
            sx={{ height: "100%" }}
            title={"active loans"}
            titleValue={
              isLoading ? (
                <PuffLoader size={32} />
              ) : (
                (statusCounts.approved || 0) +
                (statusCounts.pending || 0) +
                (statusCounts.rejected || 0)
              )
            }
            bgcolor={red[50]}
            icon={<BackupTableIcon sx={{ color: red[500] }} fontSize="large" />}
            status={"status"}
            statusValue={
              <Typography
                variant="caption"
                sx={{
                  color: statusCounts.approved > 0 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {isLoading ? (
                  <PulseLoader size={10} />
                ) : statusCounts.approved > 0 ? (
                  "Good Standing"
                ) : (
                  "Bad Standing"
                )}
              </Typography>
            }
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
          <CardSection
            sx={{ height: "100%" }}
            title={"Approved loans"}
            titleValue={
              isLoading ? <PuffLoader size={32} /> : statusCounts.approved || 0
            }
            bgcolor={pink[50]}
            icon={
              <CheckCircleOutlineIcon
                sx={{ color: pink[500] }}
                fontSize="large"
              />
            }
            status={"total amount"}
            statusValue={
              isLoading ? <PulseLoader size={10} /> : totals.approved || 0
            }
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
          <CardSection
            sx={{ height: "100%" }}
            title={"Pending Requests"}
            titleValue={
              isLoading ? <PuffLoader size={32} /> : statusCounts.pending || 0
            }
            bgcolor={purple[50]}
            icon={
              <AccessTimeIcon sx={{ color: purple[500] }} fontSize="large" />
            }
            status={"Pending amount"}
            statusValue={
              isLoading ? <PulseLoader size={10} /> : totals.pending || 0
            }
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
          <CardSection
            sx={{ height: "100%" }}
            title={"Rejected loans"}
            titleValue={
              isLoading ? <PuffLoader size={32} /> : statusCounts.rejected || 0
            }
            bgcolor={deepPurple[50]}
            icon={
              <ClearIcon sx={{ color: deepPurple[500] }} fontSize="large" />
            }
            status={"rejected amount"}
            statusValue={
              isLoading ? <PulseLoader size={10} /> : totals.rejected || 0
            }
          />
        </Grid>

        <Grid
          size={{ xs: 12, sm: 6, md: 6, lg: 6 }}
          sx={{
            boxShadow: 3,
            bgcolor: "#b2ebf2",
            borderRadius: 6,
            padding: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: { xs: 1, md: 1 },

              width: "100%",

              borderRadius: 6,

              textAlign: "center",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Loan Details in Chart
          </Typography>
          <PieChart
            sx={{ width: "100%" }}
            series={[
              {
                data: pieChartData,
              },
            ]}
            height={300}
            slotProps={{
              legend: {
                direction: "row",
                position: {
                  vertical: "bottom",
                  horizontal: "middle",
                },
                itemGap: 20,
                sx: {
                  mt: 4,
                },
              },
            }}
          />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6, md: 6, lg: 6 }}
          sx={{
            boxShadow: 3,
            bgcolor: "#b2ebf2",
            borderRadius: 6,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              height: "100%",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 0,

                width: "100%",

                borderRadius: 6,

                textAlign: "center",
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              Amount Details
            </Typography>
            <BarChart
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                height: "100%",
              }}
              xAxis={[
                {
                  id: "barCategories",
                  data: ["Pending", "Rejected", "Approved"],
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: [totals.pending, totals.rejected, totals.approved],
                  color: " rgba(50, 178, 233, 0.94)",
                },
              ]}
              height={300}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
