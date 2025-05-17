import * as React from "react";

import {
  Chip,
  Box,
  Modal,
  Typography,
  IconButton,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { supabase } from "@/lib/client";
import useLoanRealtime from "../lib/useLoanRealtime";
import Table from "../components/table";
import { useUser } from "@/context/store";
import { blue, green, yellow, purple } from "@mui/material/colors";

export default function DataTable() {
  const { user, loading, admin, loanData } = useUser();
  const [usersData, setUsersData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (loanData) {
      setUsersData(loanData);
    }
  }, [loanData]);

  useLoanRealtime({ table: "loanDetails", setData: setUsersData });

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

  // Handle opening the modal
  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 100 },
    {
      field: "fullName",
      headerName: "Name",
      minWidth: 180,
      ...(admin && {
        renderCell: (params) => {
          return (
            <Button
              onClick={() => handleOpenModal(params.row)}
              variant="extra"
              disableRipple
            >
              {params.value}
            </Button>
          );
        },
      }),
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,

      renderCell: (params) => {
        const value = params.value?.toLowerCase() || "";
        const color =
          value === "approved"
            ? "chipSuccess"
            : value === "rejected"
              ? "chipError"
              : value === "pending"
                ? "chipWarning"
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

  // Modal style
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 1288, md: 1400 },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: "80vh",
    overflowY: "auto",
  };

  // Section style
  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: 200,
    p: 2,
    borderRadius: 1,
    width: 300,
    maxWidth: 300,
  };

  return (
    <>
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold" }}
          color="primary"
        >
          {admin ? "Loan Details" : "My Loan Details"}
        </Typography>
      </Box>

      <Table
        rowsData={usersData}
        columnsData={columns}
        loading={loading}
        handleProcessRowUpdate={handleProcessRowUpdate}
      />
      {/* Modal for Row Details */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography
            variant="h4"
            sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
          >
            User Details
          </Typography>
          {selectedRow ? (
            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
              <Grid xs={12} sm={3}>
                <Box
                  sx={{
                    ...sectionStyle,
                    bgcolor: "customBlue.main",
                    color: "customBlue.contrastText",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    Personal Info
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Name:</strong> {selectedRow.fullName || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {selectedRow.email || "N/A"}
                  </Typography>
                </Box>
              </Grid>

              <Grid xs={12} sm={0.1}>
                <Divider
                  orientation="vertical"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    height: "100%",
                    bgcolor: (theme) => theme.palette.divider,
                    width: 8,
                  }}
                />
              </Grid>

              <Grid xs={12} sm={3}>
                <Box
                  sx={{
                    ...sectionStyle,
                    bgcolor: "customPink.main",
                    color: "customPink.contrastText",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    Employment Info
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Occupation:</strong>{" "}
                    {selectedRow.occupation || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Income:</strong> ₨
                    {selectedRow.income?.toLocaleString() || "0"}
                  </Typography>
                </Box>
              </Grid>

              <Grid xs={12} sm={0.1}>
                <Divider
                  orientation="vertical"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    height: "100%",
                    bgcolor: (theme) => theme.palette.divider,
                    width: 8,
                  }}
                />
              </Grid>

              <Grid xs={12} sm={3}>
                <Box
                  sx={{
                    ...sectionStyle,
                    bgcolor: "customYellow.main",
                    color: "customYellow.contrastText",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    Loan Info
                  </Typography>
                  <Typography sx={{ mb: 1 }}>
                    <strong>Loan Amount:</strong> ₨
                    {selectedRow.loanAmount?.toLocaleString() || "0"}
                  </Typography>
                  <Typography>
                    <strong>Purpose:</strong> {selectedRow.loanPurpose || "N/A"}
                  </Typography>
                </Box>
              </Grid>

              <Grid xs={12} sm={0.1}>
                <Divider
                  orientation="vertical"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    height: "100%",
                    bgcolor: (theme) => theme.palette.divider,
                    width: 8,
                  }}
                />
              </Grid>

              <Grid xs={12} sm={2.7}>
                <Box
                  sx={{
                    ...sectionStyle,
                    bgcolor: "customPurple.main",
                    color: "customPurple.contrastText",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    Status
                  </Typography>
                  <Chip
                    label={selectedRow.status?.toLowerCase() || "unknown"}
                    color={
                      selectedRow.status?.toLowerCase() === "approved"
                        ? "chipSuccess"
                        : selectedRow.status?.toLowerCase() === "rejected"
                          ? "chipError"
                          : selectedRow.status?.toLowerCase() === "pending"
                            ? "chipWarning"
                            : "default"
                    }
                    sx={{
                      textTransform: "capitalize",
                      bgcolor: (theme) =>
                        theme.palette.mode === "dark" &&
                        (selectedRow.status?.toLowerCase() === "approved"
                          ? theme.palette.success.dark
                          : selectedRow.status?.toLowerCase() === "rejected"
                            ? theme.palette.error.dark
                            : selectedRow.status?.toLowerCase() === "pending"
                              ? theme.palette.warning.dark
                              : theme.palette.grey[700]),
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Typography sx={{ textAlign: "center" }}>
              No data selected
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
}
