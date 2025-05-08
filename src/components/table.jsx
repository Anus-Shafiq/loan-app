import * as React from "react";
import {
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
  DataGrid,
} from "@mui/x-data-grid";
import { Paper, Chip, Box } from "@mui/material";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { supabase } from "@/lib/client";
import useUserData from "../lib/user";
import useLoanRealtime from "../lib/useLoanRealtime";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const paginationModel = { page: 0, pageSize: 10 };

function CustomToolbar() {
  return (
    <Box sx={{ p: 1 }}>
      <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </Stack>
        <GridToolbarQuickFilter
          debounceMs={500}
          placeholder="Search users..."
        />
      </Stack>
    </Box>
  );
}

export default function DataTable() {
  const { userData, loading, admin } = useUserData();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    if (userData) {
      setUsersData(userData);
    }
  }, [userData]);

  useLoanRealtime(setUsersData);

  const handleProcessRowUpdate = async (newRow, oldRow) => {
    const { error } = await supabase
      .from("loanDetails")
      .update({
        loanAmount: newRow.loanAmount,
      })
      .eq("id", newRow.id);

    if (error) {
      console.error("Update failed", error);
      return oldRow;
    }

    return newRow;
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from("loanDetails")
        .delete()
        .eq("id", id);
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const { error } = await supabase
        .from("loanDetails")
        .update({ status: "rejected" })
        .eq("id", id);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async (id) => {
    try {
      const { error } = await supabase
        .from("loanDetails")
        .update({ status: "approved" })
        .eq("id", id);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserStatus = (id, status) => {
    setUsersData((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, status } : user))
    );
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
        return (
          <Chip
            sx={{ textTransform: "capitalize" }}
            label={value}
            color={color}
          />
        );
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
      editable: admin ? true : false,
    },
    ...(admin
      ? [
          {
            field: "requestActions",
            headerName: "Request Actions",
            minWidth: 290,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
              const { status } = params.row;
              const lowerStatus = status?.toLowerCase();

              return (
                <>
                  {lowerStatus !== "approved" && (
                    <Button
                      onClick={() => handleAccept(params.id)}
                      variant="contained"
                      color="success"
                      startIcon={<DoneIcon />}
                      sx={{ mr: 1 }}
                    >
                      Approve
                    </Button>
                  )}
                  {lowerStatus !== "rejected" && (
                    <Button
                      onClick={() => handleReject(params.id)}
                      variant="contained"
                      color="error"
                      startIcon={<CloseIcon />}
                    >
                      Reject
                    </Button>
                  )}
                </>
              );
            },
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
    <>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Loan Requests
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          p: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Paper
          sx={{
            width: "100%",

            bgcolor: "#b2ebf2",
            borderRadius: 4,
            p: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <DataGrid
              rows={usersData}
              columns={columns}
              loading={loading}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
              processRowUpdate={handleProcessRowUpdate}
              slots={{ toolbar: CustomToolbar }}
              sx={{
                border: 0,
                fontSize: { xs: 12, sm: 14 },
              }}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
}
