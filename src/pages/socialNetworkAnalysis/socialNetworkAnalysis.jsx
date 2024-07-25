import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";  

const SocialNetworkAnalysis = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.open("http://34.34.218.37:3000/");
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h4" align="center">
        Loading...
      </Typography>
    </Box>
  );
};

export default SocialNetworkAnalysis;