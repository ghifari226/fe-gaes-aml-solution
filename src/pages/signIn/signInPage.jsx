import React, { useState } from "react";
import { Box, Card, CardContent, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    if (username === "johndoe" && password === "secret") {
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#ffffff"
    >
      <Card sx={{ minWidth: 275, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Sign In
          </Typography>
          <form onSubmit={handleSignIn}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box mt={2}>
              <Button fullWidth variant="contained" color="primary" type="submit">
                Sign In
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignInPage;