import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ErrorNotifier from "../notifier/ErrorNotifier";
import SuccessNotifier from "../notifier/SuccessNotifier";
import AdminsTable from "./AdminsTable";

const AddAdmin = () => {
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({ name: "", email: "", age: "" });
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name cannot be empty or contain only spaces";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const age = Number(formData.age);
    if (age < 1 || age > 130 || isNaN(age)) {
      newErrors.age = "Age must be between 1 and 130";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    fetch("https://admindashboardbe.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setUsers([...users, formData]);
        setFormData({ name: "", email: "", age: "" });
        setErrors({});
        setIsSuccess(true);
        setSuccessMessage("Admin added successfully");
      })
      .catch((error) => {
        setHasError(true);
        setErrorMessage("An error occurred while adding users", error?.message);
        console.error("Error:", error);
      });
  };

  return (
    <>
      {hasError && (
        <ErrorNotifier {...{ message: errorMessage, setHasError }} />
      )}
      {isSuccess && (
        <SuccessNotifier {...{ message: successMessage, setIsSuccess }} />
      )}

      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            margin="normal"
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            fullWidth
            margin="normal"
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Age"
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            fullWidth
            margin="normal"
            required
            error={!!errors.age}
            helperText={errors.age}
            inputProps={{
              min: 1,
              max: 130,
              step: 1,
              style: { appearance: "none", MozAppearance: "textfield" },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>

        {users.length > 0 && <AdminsTable users={users} isAdded={true} />}
      </Container>
    </>
  );
};

export default AddAdmin;
