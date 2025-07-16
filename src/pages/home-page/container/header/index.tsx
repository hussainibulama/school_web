import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { LogoVireo } from '../../../../container';
import { useNavigate } from 'react-router';
const Header: React.FC = () => {
  const navigate = useNavigate();

  //   const theme = useTheme();
  //   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position='sticky'
      color='transparent'
      elevation={0}
      sx={{
        px: { xs: 0, sm: 10 },
        py: { xs: 2, sm: 2 },
        backdropFilter: 'blur(10px)',
        background: '#fff',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: { xs: 2, sm: 0 } }}>
        {/* Logo */}
        <Box>
          <LogoVireo logoSize={50} />
        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant='outlined'
            onClick={() => navigate('/login')}
            sx={{
              py: 1,
              color: 'black',
              borderColor: 'black',
              borderRadius: '999px',
              backgroundColor: 'white',
              fontFamily: 'Inter, "sans-serif"',
              textTransform: 'capitalize',
              '&:hover': {
                fontFamily: 'Inter, "sans-serif"',
                backgroundColor: 'black',
                color: 'white',
              },
            }}
          >
            Login
          </Button>
          <Button
            variant='contained'
            onClick={() => navigate('/signup')}
            sx={{
              py: 1,
              backgroundColor: '#009d00',
              fontFamily: 'Inter, "sans-serif"',
              color: 'white',
              borderRadius: '999px',
              textTransform: 'capitalize',
              '&:hover': {
                fontFamily: 'Inter, "sans-serif"',
                backgroundColor: '#007c00',
              },
            }}
          >
            Try for Free
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
