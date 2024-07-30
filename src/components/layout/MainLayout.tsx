import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import sizeConfigs from "../../configs/sizeConfigs";
import colorConfigs from "../../configs/colorConfigs";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  return (
    <Box sx={{ display: "flex" }}>
      {hideSidebar ? (
        <></>
      ) : isMobile ? (
        <Topbar />
      ) : (
        <Box
          component="nav"
          sx={{
            width: sizeConfigs.sidebar.width,
            flexShrink: 0,
          }}
        >
          <Sidebar />
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: isMobile
            ? "100%"
            : `calc(100% - ${sizeConfigs.sidebar.width})`,
          minHeight: "100vh",
          backgroundColor: colorConfigs.mainBg,
        }}
      >
        {isMobile && <Toolbar />}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
