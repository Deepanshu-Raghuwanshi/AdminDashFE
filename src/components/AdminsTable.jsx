import { Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const AdminsTable = ({ users, isAdded = false }) => {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "age", headerName: "Age", type: "number", width: 110 },
  ];

  const rows =
    users.length > 0 &&
    users.map((user, index) => ({
      id: index + 1,
      name: user.name,
      email: user.email,
      age: user.age,
    }));

  return (
    <>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          {isAdded ? "Added Admin" : "Admins List"}
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </>
  );
};

export default AdminsTable;
