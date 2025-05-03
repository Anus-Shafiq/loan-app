import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardSection from "./card";
import { red, purple, pink, deepPurple } from "@mui/material/colors";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import { supabase } from "@/lib/client";
import { useEffect, useState } from "react";
import { useUser } from "@/context/store";
import { PuffLoader, PulseLoader } from "react-spinners";

export default function DashboardData() {
  const [filterData, setFilterData] = useState([]);
  const { user, loading } = useUser();
  async function getUserData() {
    try {
      const { data, error } = await supabase
        .from("loanDetails")
        .select()
        .eq("status", "Pending");

      if (error) throw error;
      if (data) {
        setFilterData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

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
        {user ? `Hello ${user.email}!` : <PulseLoader size={20} margin={10} />}
      </Typography>
      <Grid container spacing={3} sx={{ width: "95%" }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardSection
            title={"active loans"}
            titleValue={<PuffLoader size={32} />}
            bgcolor={red[50]}
            icon={<BackupTableIcon sx={{ color: red[500] }} fontSize="large" />}
            status={"active"}
            statusValue={20}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardSection
            title={"Pending Requests"}
            titleValue={
              !filterData.length ? <PuffLoader size={32} /> : filterData.length
            }
            bgcolor={purple[50]}
            icon={
              <AccessTimeIcon sx={{ color: purple[500] }} fontSize="large" />
            }
            status={"active"}
            statusValue={20}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardSection
            title={"Approved loans"}
            titleValue={<PuffLoader size={32} />}
            bgcolor={pink[50]}
            icon={
              <CheckCircleOutlineIcon
                sx={{ color: pink[500] }}
                fontSize="large"
              />
            }
            status={"active"}
            statusValue={20}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardSection
            title={"Total Customers"}
            titleValue={<PuffLoader size={32} />}
            bgcolor={deepPurple[50]}
            icon={
              <BarChartIcon sx={{ color: deepPurple[500] }} fontSize="large" />
            }
            status={"active"}
            statusValue={20}
          />
        </Grid>
      </Grid>
    </>
  );
}
