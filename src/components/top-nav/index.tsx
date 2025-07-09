import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Box,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ArrowDropDownCircle, Menu as MenuIcon } from '@mui/icons-material';
import { useUserInfo } from '../../hooks';

const TopNav = () => {
  const { data: user } = useUserInfo();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    handleMenuClose();
  };

  const handleProfile = () => {
    console.log('Going to profile...');
    handleMenuClose();
  };

  const currentPage = location.pathname.split('/').pop()?.replaceAll('-', ' ');
  const textStyles = {
    fontFamily: `"Inter", sans-serif`,
    color: 'rgb(56, 58, 63)',
  };

  return (
    <AppBar
      position='sticky' // Change to sticky for the sticky behavior
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid #ddd',
        top: 0, // Ensure it sticks to the top
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: isMobile ? 'space-between' : 'space-between',
          padding: '0 16px',
        }}
      >
        {isMobile && (
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant='h6'
          component='div'
          sx={{
            color: 'rgb(56, 58, 63)',
            fontFamily: `"Inter", sans-serif`,
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}
        >
          {currentPage}
        </Typography>
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 30, height: 30, marginRight: 1 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ ...textStyles, fontSize: '12px' }}>
                {`${user?.data?.firstName} ${user?.data?.middleName} ${user?.data?.lastName}`}
              </Typography>
              <Typography sx={{ ...textStyles, fontSize: '11px' }}>{user?.data?.email}</Typography>
            </Box>
            <Button
              onClick={handleMenuOpen}
              sx={{ display: 'flex', alignItems: 'center', padding: 0 }}
            >
              <ArrowDropDownCircle sx={{ color: 'rgb(216, 216, 227)' }} />
            </Button>
          </Box>
        )}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem
            onClick={handleProfile}
            sx={{ fontFamily: `"Inter", sans-serif`, fontSize: '12px' }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{ fontFamily: `"Inter", sans-serif`, fontSize: '12px' }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
