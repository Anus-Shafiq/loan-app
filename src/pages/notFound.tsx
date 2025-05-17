import React from "react";
import { Result } from "antd";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title={
        <Typography variant="h3" sx={{ fontWeight: "bold" }} color="primary">
          404
        </Typography>
      }
      subTitle={
        <Typography variant="body1" sx={{ fontWeight: "bold" }} color="primary">
          Sorry, the page you visited does not exist.
        </Typography>
      }
      extra={
        <Button
          onClick={() => navigate("/dashboard")}
          color="primary"
          variant="contained"
        >
          Back App
        </Button>
      }
    />
  );
};

export default NotFound;
