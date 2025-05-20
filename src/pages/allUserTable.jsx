import { useUser } from "@/context/store";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Table from "../components/table";
import { supabase } from "@/lib/client";

export default function AllUserData() {
  const { user, loading, admin, loanData, allUsers } = useUser();

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "created_at",
      headerName: "Created at",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 300,
    },
    {
      field: "userId",
      headerName: "User Id",

      width: 300,
    },
    {
      field: "role",
      headerName: "Role",
      sortable: false,
      width: 100,
    },
    {
      field: "delete",
      headerName: "Delete",
      minWidth: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  return (
    <>
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold" }}
          color="primary"
        >
          All Users
        </Typography>
      </Box>

      <Table rowsData={allUsers} columnsData={columns} loading={loading} />
    </>
  );
}
