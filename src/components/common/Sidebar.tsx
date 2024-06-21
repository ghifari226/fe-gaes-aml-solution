import { useNavigate } from "react-router-dom";
import {
  Avatar,
  ButtonBase,
  Drawer,
  List,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import assets from "../../assets";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      {isMobile ? (
        <div></div>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: sizeConfigs.sidebar.width,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: sizeConfigs.sidebar.width,
              boxSizing: "border-box",
              borderRight: "0px",
              backgroundColor: colorConfigs.sidebar.bg,
              color: colorConfigs.sidebar.color,
            },
          }}
        >
          <List disablePadding>
            <Toolbar sx={{ marginBottom: "20px", justifyContent: "center" }}>
              <ButtonBase
                sx={{ justifyContent: "center" }}
                onClick={handleLogoClick}
              >
                <Avatar
                  src={assets.images.water}
                  sx={{ width: 30, height: 30 }}
                />
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="center"
                >
                  <Typography variant="h5" sx={{
                    fontFamily: 'Roboto Condensed, sans-serif'
                  }}>
                    TIRTASENA
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      flexGrow: 1,
                      marginTop: '2px',
                      fontSize: 12,
                      fontFamily: 'Dosis, sans-serif'
                    }}
                  >
                    AML
                  </Typography>
                </Stack>
              </ButtonBase>
            </Toolbar>
            {appRoutes
              .filter((route) => route.path !== "/ai-analysis")
              .map((route, index) =>
                route.sidebarProps ? (
                  route.child ? (
                    <SidebarItemCollapse item={route} key={index} />
                  ) : (
                    <SidebarItem item={route} key={index} />
                  )
                ) : null
              )}
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
