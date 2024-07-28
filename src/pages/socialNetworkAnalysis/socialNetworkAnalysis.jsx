import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import assets from "../../assets";
import sizeConfigs from "../../configs/sizeConfigs";

const BackgroundContainer = styled(Box)(({ backgroundImage }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  opacity: 0.1,
  zIndex: 0,
}));

const SocialNetworkAnalysis = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(true);
  const backgroundImage = assets.images.neo4j;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const sidebarWidth = sizeConfigs.sidebar.width;

  const handleClose = () => {
    navigate("/");
  };

  const handleConfirm = () => {
    window.open("http://34.34.218.37:3000/", "_blank", "noopener,noreferrer");
    navigate("/");
  };

  return (
    <Box position="relative" minHeight="100vh">
      <BackgroundContainer backgroundImage={backgroundImage} />
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            position: "absolute",
            top: "10%",
            left: isMobile ? "50%" : `calc(50% + ${sidebarWidth} / 2)`,
            transform: "translate(-50%, 0)",
            minWidth: "300px",
          },
        }}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          Fitur Analisis Jaringan Sosial akan diarahkan ke NeoDash. Anda yakin
          ingin melanjutkan?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Tidak
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SocialNetworkAnalysis;
