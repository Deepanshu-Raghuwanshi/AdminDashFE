import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";
import Home from "./components/Home";
import AddAdmin from "./components/AddAdmin";
import SearchAdmin from "./components/SeachAdmin";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/search">
            Search
          </Button>
          <Button color="inherit" component={Link} to="/add-user">
            Add User
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchAdmin />} />
          <Route path="/add-user" element={<AddAdmin />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
