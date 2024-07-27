import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SocialNetworkAnalysis = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.open("http://34.34.218.37:3000/", "_blank", "noopener,noreferrer");
      navigate("/");
    }, 800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      paddingTop="4rem"
    >
      <Typography variant="h4" align="center">
        Mengarahkan ke NeoDash...
      </Typography>
    </Box>
  );
};

export default SocialNetworkAnalysis;
