import { AppBar, Toolbar, Box, Button, darken, useTheme, useMediaQuery } from '@mui/material';
import { LogoVireo } from '../../../../container';
import { useNavigate } from 'react-router';
import { APP_NAME } from '../../../../contants';
import { Helmet } from 'react-helmet-async';

export default function LandingPageHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const baseButtonStyles = {
    px: '1rem',
    py: '0.75rem',
    width: 'fitContent',
    height: '2rem',
    fontWeight: 500,
    fontSize: '0.775rem',
    fontFamily: '"DM Sans", sans-serif',
    borderRadius: '0.4rem',
    textTransform: 'capitalize',
    boxShadow: 0,
    '&:hover': {
      boxShadow: 0,
    },
  };

  const loginButtonStyles = {
    ...baseButtonStyles,
    color: 'rgb(75, 85, 99)',
    backgroundColor: '#fff',
    '&:hover': {
      ...baseButtonStyles['&:hover'],
      color: 'rgb(37, 99, 235)',
      backgroundColor: darken('#fff', 0.04),
    },
  };

  const signupButtonStyles = {
    ...baseButtonStyles,
    color: 'white',
    backgroundColor: 'rgb(37, 99, 235)',
    '&:hover': {
      ...baseButtonStyles['&:hover'],
      backgroundColor: darken('rgb(37, 99, 235)', 0.2),
    },
  };

  return (
    <AppBar
      position='sticky'
      color='transparent'
      elevation={0}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: '#fff',
        px: { sm: 3, xs: 0 },
        borderBottom: '1px solid hsl(240, 5.9%, 90%)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Logo */}
        <Box>
          <LogoVireo logoSize={isMobile ? 25 : 35} nameSize={isMobile ? 20 : 30} />
        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant='text' onClick={() => navigate('/login')} sx={loginButtonStyles}>
            Login
          </Button>
          <Button variant='contained' onClick={() => navigate('/signup')} sx={signupButtonStyles}>
            Start Free Trial
          </Button>
        </Box>
      </Toolbar>
      <Helmet>
        <title>Home | {APP_NAME} Mordern Cloud-Based MIS</title>
      </Helmet>
    </AppBar>
  );
}
