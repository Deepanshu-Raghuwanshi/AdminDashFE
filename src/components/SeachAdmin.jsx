import React, { useState } from "react";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import AdminsTable from "./AdminsTable";

const SearchAdmin = () => {
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState([]);
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSearch = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(
        `https://admindashboardbe.onrender.com/users/search?email=${email}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (data?.data) {
        const admins = data?.data;

        setAdmin([admins]);
        setError(null);
      } else {
        setAdmin(null);
        setError("No user found with this email.");
      }
    } catch (err) {
      console.log(err);
      setError("Error fetching admin. Please try again later.");
      setAdmin(null);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Admin by Email
      </Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        error={!!error}
        helperText={error || "Enter the admin email to search"}
      />
      <Button
        style={{ marginBottom: "25px" }}
        variant="contained"
        color="primary"
        onClick={handleSearch}
      >
        Search
      </Button>

      {admin?.length > 0 && <AdminsTable users={admin} />}

      {!admin && !error && (
        <Typography variant="h6" sx={{ mt: 4 }}>
          No user found with this email.
        </Typography>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default SearchAdmin;
