import React, { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import AdminsTable from "./AdminsTable";
import ErrorNotifier from "../notifier/ErrorNotifier";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://admindashboardbe.onrender.com/users"
      );
      if (!response.ok) {
        setHasError(true);
        setErrorMessage("An error occurred while fetching admins");
      }
      const data = await response.json();
      setUsers(data?.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return (
    <>
      {hasError && (
        <ErrorNotifier {...{ message: errorMessage, setHasError }} />
      )}
      <Box
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ marginBottom: 3 }}
        >
          Welcome to the Admin Dashboard
        </Typography>

        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/add-user"
          sx={{
            marginBottom: 4,
            paddingX: 3,
            paddingY: 1.5,
          }}
        >
          Add Admin
        </Button>
        {users.length > 0 && <AdminsTable users={users} />}
      </Box>
    </>
  );
};

export default AdminDashboard;
