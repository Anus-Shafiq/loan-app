import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardSection from "./card";
import { red, purple, pink, deepPurple } from "@mui/material/colors";
import BackupTableIcon from "@mui/icons-material/BackupTable";

export default function DashboardData() {
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
        }}
      >
        hello babes!
      </Typography>
      <Grid container spacing={3} sx={{ width: "95%" }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardSection
            title={"active loans"}
            titleValue={20}
            bgcolor={red[50]}
            icon={<BackupTableIcon sx={{ color: red[500] }} fontSize="large" />}
            status={"active"}
            statusValue={20}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardSection
            title={"active loans"}
            titleValue={20}
            bgcolor={purple[50]}
            icon={
              <BackupTableIcon sx={{ color: purple[500] }} fontSize="large" />
            }
            status={"active"}
            statusValue={20}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardSection
            title={"active loans"}
            titleValue={20}
            bgcolor={pink[50]}
            icon={
              <BackupTableIcon sx={{ color: pink[500] }} fontSize="large" />
            }
            status={"active"}
            statusValue={20}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <CardSection
            title={"active loans"}
            titleValue={20}
            bgcolor={deepPurple[50]}
            icon={
              <BackupTableIcon
                sx={{ color: deepPurple[500] }}
                fontSize="large"
              />
            }
            status={"active"}
            statusValue={20}
          />
        </Grid>
      </Grid>
    </>
  );
}
