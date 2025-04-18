import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";

import getUserData from "@/lib/user";

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "fullName", headerName: "Name", flex: 1 },
  { field: "occupation", headerName: "Occupation", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  {
    field: "income",
    headerName: "Income",
    type: "number",
    flex: 1,
  },
  {
    field: "loanAmount",
    headerName: "Loan Amount",
    type: "number",
    flex: 1,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    userDetails();
  }, []);

  const userDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getUserData();
      setUsersData(response.data);

      console.log(response.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        height: 600,
        width: "95%",
        bgcolor: "#b2ebf2",
        borderRadius: 6,
        padding: 2,
      }}
    >
      <DataGrid
        rows={usersData}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
