import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { SideNav, TopNav } from "../index";

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <SideNav />
      <Box
        component="main"
        width="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          // marginLeft: "240px", // Offset for SideNav (if it's permanent)
          zIndex: 1, // Ensure the main content is above the SideNav
        }}
      >
        <TopNav />
        <Box component="main" sx={{ flexGrow: 1, p: 2, width: "100%" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
