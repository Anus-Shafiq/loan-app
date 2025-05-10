import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import {
  PeopleAlt,
  Paid,
  CheckCircle,
  AccountBalanceWallet,
} from "@mui/icons-material";
import { PieChart, BarChart } from "@mui/x-charts";

const stats = [
  {
    label: "Total Users",
    value: 320,
    icon: <PeopleAlt color="primary" />,
    color: "#e3f2fd",
  },
  {
    label: "Total Loans",
    value: 850,
    icon: <Paid color="success" />,
    color: "#e8f5e9",
  },
  {
    label: "Disbursed Amount",
    value: "₨ 5,000,000",
    icon: <CheckCircle color="action" />,
    color: "#fff8e1",
  },
  {
    label: "Active Loans",
    value: 432,
    icon: <AccountBalanceWallet color="error" />,
    color: "#ffebee",
  },
];

const recentApplications = [
  { name: "Ali Khan", status: "Approved", date: "2025-05-01" },
  { name: "Sara Ahmed", status: "Pending", date: "2025-05-05" },
  { name: "Usman Tariq", status: "Rejected", date: "2025-05-06" },
  { name: "Nida Zafar", status: "Approved", date: "2025-05-07" },
];

const pieData = [
  { id: 0, value: 500, label: "Approved", color: "#81c784" },
  { id: 1, value: 200, label: "Pending", color: "#ffb74d" },
  { id: 2, value: 150, label: "Rejected", color: "#e57373" },
];

const barData = [320, 450, 390, 600, 720, 800, 690];

export default function AdminDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        Admin Dashboard
      </Typography>

      {/* Stats */}
      <Grid container spacing={3}>
        {stats.map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card sx={{ bgcolor: item.color, p: 1 }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: "white", color: "black", mr: 2 }}>
                  {item.icon}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2">{item.label}</Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {item.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mt={1}>
        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2} textAlign="center">
                Loan Status Distribution
              </Typography>
              <PieChart
                height={300}
                series={[{ data: pieData }]}
                slotProps={{
                  legend: {
                    direction: "row",
                    position: { vertical: "bottom", horizontal: "middle" },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2} textAlign="center">
                Monthly Loan Applications
              </Typography>
              <BarChart
                height={300}
                xAxis={[
                  {
                    id: "months",
                    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    scaleType: "band",
                  },
                ]}
                series={[{ data: barData, color: "#42a5f5" }]}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Applications Table */}
      <Box mt={4}>
        <Typography variant="h6" mb={2}>
          Recent Applications
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentApplications.map((app, index) => (
                <TableRow key={index}>
                  <TableCell>{app.name}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>{app.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
}
