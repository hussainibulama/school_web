import { useState, MouseEvent } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Box,
  useMediaQuery,
  Stack,
  useTheme,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ArrowDropDownCircle } from '@mui/icons-material';
import { useUserInfo } from '../../hooks';
import { PanelLeftIcon } from '../../assets';
import { useGeneralContext } from '../../hoc';
import { Helmet } from 'react-helmet-async';
import { APP_NAME } from '../../contants';

const TopNav = () => {
  const theme = useTheme();

  const { data: user } = useUserInfo();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const { setShowIconsOnly } = useGeneralContext();

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
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

  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Helper function to detect likely ID (UUID or numeric ID)
  const isLikelyId = (segment: string) => {
    return (
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(segment) ||
      /^\d+$/.test(segment)
    );
  };

  let currentPage = '';

  if (pathSegments.length === 0) {
    currentPage = 'Dashboard';
  } else if (isLikelyId(pathSegments[pathSegments.length - 1])) {
    // If last segment is an ID, use the one before it
    currentPage = pathSegments[pathSegments.length - 2];
  } else {
    currentPage = pathSegments[pathSegments.length - 1];
  }

  // Format: replace dashes and capitalize
  currentPage = currentPage?.replace(/-/g, ' ')?.replace(/\b\w/g, (char) => char.toUpperCase());
  const textStyles = {
    fontFamily: theme.typography.fontFamily,
    color: 'rgb(56, 58, 63)',
  };

  return (
    <AppBar
      position='sticky'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid #ddd',
        top: 0,
        transition: 'all 0.3s ease-in-out',
        width: '100%',
      }}
    >
      <Helmet>
        <title>
          {currentPage} | {APP_NAME} Cloud Based SIMS
        </title>
      </Helmet>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: !isMobile ? 'space-between' : 'flex-end',
        }}
      >
        <Stack spacing={2} direction='row'>
          {!isMobile && (
            <Button
              sx={{
                cursor: 'pointer',
                color: 'black',
                minWidth: 'fit-content',
                p: 0,
                m: 0,
              }}
              onClick={() => setShowIconsOnly((prev) => !prev)}
            >
              <PanelLeftIcon />
            </Button>
          )}
          <Typography
            variant='h6'
            component='div'
            sx={{
              color: 'rgb(56, 58, 63)',
              fontFamily: theme.typography.fontFamily,
              fontSize: '16px',
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
          >
            {currentPage}
          </Typography>
        </Stack>
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
          {[
            { label: 'Profile', onClick: handleProfile },
            { label: 'Logout', onClick: handleLogout },
          ].map((entry) => (
            <MenuItem
              onClick={entry.onClick}
              sx={{ fontFamily: theme.typography.fontFamily, fontSize: '12px' }}
            >
              {entry.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
