import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Paper, Chip, Box } from "@mui/material";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import { supabase } from "@/lib/client";
import useUserData from "../lib/user";

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable() {
  const { userData, loading, admin } = useUserData();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    if (userData) {
      setUsersData(userData);
    }
  }, [userData]);

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from("loanDetails")
        .delete()
        .eq("id", id);

      if (error) throw error;

      const updatedData = usersData.filter((user) => user.id !== id);
      setUsersData(updatedData);
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 100 },
    { field: "fullName", headerName: "Name", minWidth: 180 },
    { field: "occupation", headerName: "Occupation", minWidth: 180 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      renderCell: (params) => {
        const value = params.value?.toLowerCase() || "";
        const color =
          value === "approved"
            ? "success"
            : value === "rejected"
              ? "error"
              : value === "pending"
                ? "warning"
                : "default";
        return <Chip label={value} color={color} />;
      },
    },
    {
      field: "income",
      headerName: "Income",
      type: "number",
      minWidth: 150,
    },
    {
      field: "loanAmount",
      headerName: "Loan Amount",
      type: "number",
      minWidth: 150,
    },
    ...(admin
      ? [
          {
            field: "requestActions",
            headerName: "Request Actions",
            minWidth: 290,
            sortable: false,
            filterable: false,
            renderCell: () => (
              <>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<DoneIcon />}
                  sx={{ ml: 1 }}
                >
                  Accept
                </Button>
              </>
            ),
          },
        ]
      : []),
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
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        p: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Paper
        sx={{
          minWidth: "1000px",
          maxWidth: "100%",
          overflowX: "auto",
          mx: "auto",
          bgcolor: "#b2ebf2",
          borderRadius: 4,
          p: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: { xs: 400, sm: 500, md: 600 },
          }}
        >
          <DataGrid
            rows={usersData}
            columns={columns}
            loading={loading}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            sx={{
              border: 0,
              fontSize: { xs: 12, sm: 14 },
              minWidth: "1000px",
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
