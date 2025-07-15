import { useState, MouseEvent, useMemo } from 'react';
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
  useTheme,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowDropDownCircle } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

import { useGetSchoolSessions, useUserInfo } from '../../hooks';
import { PanelLeftIcon, SessionIcon } from '../../assets';
import { useGeneralContext } from '../../hoc';
import { APP_NAME, AUTH_STORAGE_KEY, TERM_SHORT_CUTS } from '../../contants';
import { getCurrentPage } from '../../util';

const TopNav = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const location = useLocation();
  const navigate = useNavigate();

  const { data: session } = useGetSchoolSessions();
  const { data: user } = useUserInfo();
  const { setShowIconsOnly } = useGeneralContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentSession = session?.data?.find((entry: any) => entry.isCurrent);

  const termText = useMemo(
    () => TERM_SHORT_CUTS[currentSession?.currentTerm || 1],
    [currentSession?.currentTerm],
  );

  const academicYear = useMemo(
    () => currentSession?.academicYear?.replace('/', '-') || '',
    [currentSession?.academicYear],
  );

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    navigate('/', { replace: true });
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate(`/dashboard/staff/${user?.data?.userId}`);
    handleMenuClose();
  };

  const renderSessionTerm = () => {
    if (academicYear === '') return <></>;
    return (
      <Box
        display={!isMobile ? 'flex' : 'none'}
        alignItems='center'
        color='rgb(56, 58, 63)'
        gap={1}
      >
        <SessionIcon height={12} width={12} />
        <Typography variant='body2' sx={{ fontSize: 12, textTransform: 'capitalize' }}>
          {termText} / {academicYear}
        </Typography>
      </Box>
    );
  };

  const renderUserInfo = () => {
    const name = `${user?.data?.firstName || ''} ${user?.data?.middleName || ''} ${user?.data?.lastName || ''}`;
    return (
      <Box display='flex' alignItems='center'>
        <Avatar
          sx={{
            width: 30,
            height: 30,
            marginRight: 1,
            backgroundColor: 'rgba(210, 210, 219, 1)',
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontSize: 12, color: 'rgb(56, 58, 63)' }}>{name}</Typography>
          <Typography sx={{ fontSize: 10, color: 'rgba(105, 105, 114, 1)' }}>
            {user?.data?.email || ''}
          </Typography>
        </Box>
        <Button onClick={handleMenuOpen} sx={{ padding: 0, minWidth: 'auto', ml: 1 }}>
          <ArrowDropDownCircle sx={{ color: 'rgba(210, 210, 219, 1)' }} />
        </Button>
      </Box>
    );
  };

  return (
    <AppBar
      position='sticky'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid #ddd',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Helmet>
        <title>{`${getCurrentPage(location)} | ${APP_NAME} Cloud Based SIMS`}</title>
      </Helmet>

      <Toolbar sx={{ justifyContent: isMobile ? 'flex-end' : 'space-between' }}>
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {!isMobile && (
            <Button
              onClick={() => setShowIconsOnly((prev) => !prev)}
              sx={{ color: 'black', minWidth: 'fit-content', p: 0 }}
            >
              <PanelLeftIcon />
            </Button>
          )}
          <Typography
            variant='h6'
            display={!isMobile ? 'flex' : 'none'}
            sx={{
              color: 'rgb(56, 58, 63)',
              fontSize: 16,
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
          >
            {getCurrentPage(location)}
          </Typography>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {renderSessionTerm()}
          <Box>
            {renderUserInfo()}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              {[
                { label: 'Profile', onClick: handleProfile },
                { label: 'Logout', onClick: handleLogout },
              ].map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={item.onClick}
                  sx={{ fontSize: 12, fontFamily: theme.typography.fontFamily, py: 0.5 }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
