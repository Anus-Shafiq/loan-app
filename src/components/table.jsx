import * as React from "react";
import { Paper } from "@mui/material";

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

export default function Table({
  rowsData,
  columnsData,
  loading,
  handleProcessRowUpdate,
}) {
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
          width: "100%",

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
            sx={{ p: 2, borderRadius: 4 }}
            rows={rowsData}
            columns={columnsData}
            loading={loading}
            processRowUpdate={handleProcessRowUpdate}
            disableRowSelectionOnClick
            slots={{ toolbar: CustomToolbar }}
            pageSizeOptions={[5, 10]}
            initialState={{ pagination: { paginationModel } }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
