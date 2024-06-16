import {
  AppBar,
  Avatar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import assets from "../../assets";
import { useNavigate, useLocation } from "react-router-dom";
import appRoutes from "../../routes/appRoutes";
import colorConfigs from "../../configs/colorConfigs";

const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <>
      {!isMobile ? (
        <div></div>
      ) : (
        <AppBar
          position="fixed"
          sx={{
            width: "100%",
            boxShadow: "unset",
            backgroundColor: colorConfigs.topbar.bg,
            color: colorConfigs.topbar.color,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Avatar src={assets.images.logo} sx={{ width: 25, height: 25 }} />
            {appRoutes.map((route, index) =>
              route.sidebarProps ? (
                <div
                  key={index}
                  onClick={() => handleClick(route.path)}
                  style={{
                    fontWeight:
                      location.pathname === route.path ? "bold" : "normal",
                    marginRight: "10px", // Adjust spacing between items
                    cursor: "pointer", // Set cursor to pointer
                  }}
                >
                  {route.sidebarProps.displayText}
                </div>
              ) : null
            )}
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default Topbar;
