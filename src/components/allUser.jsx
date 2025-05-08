import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/client";
import {
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
  DataGrid,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
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

export default function AllUserData() {
  const [allUserData, setAllUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("users").select("*");
        if (error) throw error;
        if (data) {
          const formattedData = data.map((item) => ({
            ...item,
            created_at: new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(item.created_at)),
          }));
          setAllUserData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "created_at",
      headerName: "Created at",
      width: 300,
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
      type: "number",
      width: 300,
    },
    {
      field: "role",
      headerName: "Role",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 300,
    },
  ];
  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          All Users
        </Typography>
      </Box>
      <Box
        sx={{ width: "100%", overflowX: "auto", p: { xs: 1, sm: 2, md: 3 } }}
      >
        <Box sx={{ minWidth: "900px", height: "100%" }}>
          <DataGrid
            sx={{ p: 2, borderRadius: 4 }}
            rows={allUserData}
            columns={columns}
            loading={loading}
            disableRowSelectionOnClick
            slots={{ toolbar: CustomToolbar }}
            pageSizeOptions={[5, 10]}
            initialState={{ pagination: { paginationModel } }}
          />
        </Box>
      </Box>
    </>
  );
}
