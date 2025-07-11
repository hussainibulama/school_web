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

  const currentPage = location.pathname.split('/').pop()?.replaceAll('-', ' ');
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
