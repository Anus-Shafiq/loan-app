import { useUser } from "@/context/store";
import { useEffect, useState, useMemo } from "react";
import useLoanRealtime from "../lib/useLoanRealtime";
import { Grid, Box, Typography, Card } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import CardSection from "./card";
import Divider from "@mui/material/Divider";
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
import { format } from "date-fns";
import { useTheme } from "@mui/material";

export default function DashboardData() {
  const [allData, setAllData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [statusCounts, setStatusCounts] = useState({});
  const { user, loading, admin, loanData } = useUser();
  const [monthWiseStats, setMonthWiseStats] = useState([]);
  const theme = useTheme();

  useLoanRealtime(setAllData);

  useEffect(() => {
    if (loanData) {
      setAllData(loanData);
      setLoading(false);
    }
  }, [loanData]);

  useEffect(() => {
    if (allData.length) {
      setTotal(allData.length);
      const statsMap = {};
      const counts = {};

      allData.forEach((item) => {
        const date = new Date(item.created_at);
        const monthKey = format(date, "yyyy-MM");
        const monthLabel = format(date, "MMM");
        const status = item.status?.toLowerCase() || "unknown";

        counts[status] = (counts[status] || 0) + 1;

        if (!statsMap[monthKey]) {
          statsMap[monthKey] = {
            month: monthLabel,
            approved: 0,
            rejected: 0,
            pending: 0,
          };
        }

        const amount = Number(item.loanAmount) || 0;

        if (status === "approved") statsMap[monthKey].approved += amount;
        else if (status === "rejected") statsMap[monthKey].rejected += amount;
        else if (status === "pending") statsMap[monthKey].pending += amount;
      });

      // Convert to array & sort
      const sortedStats = Object.entries(statsMap)
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .slice(-3)
        .map(([, value]) => value);

      // Save to state
      setMonthWiseStats(sortedStats);
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

  const pieChartData = Object.entries(statusCounts).map(
    ([status, count], index) => {
      const label = status.charAt(0).toUpperCase() + status.slice(1);
      let color = "#9e9e9e"; // default gray

      switch (status.toLowerCase()) {
        case "approved":
          color = theme.palette.customPurple.main;
          break;
        case "pending":
          color = theme.palette.customBlue.main; // orange
          break;
        case "rejected":
          color = theme.palette.customPink.main; // red
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
      color: theme.palette.customYellow.main, // blue
    });
  }

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
          width: "95%",

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
      <Divider
        sx={{
          width: "95%",
          mx: "auto",
          my: 3,
        }}
      />
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
              isLoading ? (
                <PulseLoader size={10} />
              ) : (
                `₨ ${totals.approved || 0}`
              )
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
              isLoading ? <PulseLoader size={10} /> : `₨ ${totals.pending || 0}`
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
              isLoading ? (
                <PulseLoader size={10} />
              ) : (
                `₨ ${totals.rejected || 0}`
              )
            }
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
          <Card
            sx={{
              boxShadow: 3,

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
              Loan Status Distribution
            </Typography>
            <PieChart
              sx={{ width: "100%" }}
              series={[
                {
                  data: pieChartData,
                  innerRadius: 90,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 90,
                    additionalRadius: -30,
                    color: "gray",
                  },
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

                  sx: {
                    mt: 4,
                  },
                },
              }}
            />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
          <Card
            sx={{
              boxShadow: 3,

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
                    data: [
                      "Pending Amount",
                      "Rejected Amount",
                      "Approved Amount",
                      "Total Amount",
                    ],
                    scaleType: "band",
                  },
                ]}
                height={380}
                series={[
                  {
                    data: [
                      totals.pending,
                      totals.rejected,
                      totals.approved,
                      totals.pending + totals.rejected + totals.approved,
                    ],
                    color: theme.palette.customPurple.main,
                  },
                ]}
              />
            </Box>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
          <Card
            sx={{
              boxShadow: 3,

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
              <LineChart
                height={300}
                xAxis={[
                  {
                    data: monthWiseStats.map((item) => item.month),
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: monthWiseStats.map((item) => item.approved),
                    label: "Approved",
                    color: theme.palette.customPurple.main,
                  },
                  {
                    data: monthWiseStats.map((item) => item.rejected),
                    label: "Rejected",
                    color: theme.palette.customPink.main,
                  },
                  {
                    data: monthWiseStats.map((item) => item.pending),
                    label: "Pending",
                    color: theme.palette.customBlue.main,
                  },
                ]}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
