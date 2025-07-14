import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { SideNav, TopNav } from '..';

const DashboardLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <CssBaseline />

      {/* SideNav must allow shrink */}
      <Box sx={{ flexShrink: 0 }}>
        <SideNav />
      </Box>

      {/* Main Content */}
      <Box
        component='main'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minWidth: 0, // ✅ prevents overflow in flex layouts
          width: '100%',
          overflow: 'hidden', // prevent scroll overflow here
          zIndex: 1,
        }}
      >
        <TopNav />

        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 4 },
            minWidth: 0,
            overflow: 'auto', // ✅ scrolls inside instead of full screen
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
