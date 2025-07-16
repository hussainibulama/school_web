import { Header } from './container';
import { Box, Button, Typography } from '@mui/material';
import { LandingPageMainBg } from '../../assets';
import { LogoVireo } from '../../container';
import { useNavigate } from 'react-router';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box>
      <Header />
      <Box
        display='flex'
        flexDirection='column'
        pt={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
          py: 10,
          background: 'rgba(15, 172, 220, 0.1)', //#eacda0ff
        }}
      >
        <Typography
          sx={{
            color: '#131313',
            fontSize: { xs: '35px', sm: '50px' },
            width: { xs: '90%', sm: '70%' },
            fontFamily: 'Inter, "sans-serif"',
            textAlign: 'center',
            lineHeight: { xs: '45px', sm: '55px' },
            fontWeight: 700,
          }}
        >
          The Nigeria’s most popular MIS and school management software
        </Typography>
        <Typography
          variant='body2'
          sx={{
            fontFamily: 'Inter, "sans-serif"',
            textAlign: 'center',
            width: { xs: '90%', sm: '40%' },
            fontSize: '14px',
          }}
        >
          Vireo's now brings together top-rated, specialist systems that work together to streamline
          tasks and join up data across your whole school
        </Typography>
        <Button
          variant='contained'
          onClick={() => navigate('/signup')}
          sx={{
            py: 1.2,
            px: 1,
            width: 150,
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          my: { xs: 0, sm: 10 },
        }}
      >
        <Box
          component='img'
          src={LandingPageMainBg}
          sx={{
            borderRadius: { xs: 0, sm: 2 },
            width: { xs: '100%', sm: 900 },
            height: { xs: 300, sm: 'auto' },
            objectFit: { xs: 'cover', sm: 'contain' },
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          mt: { xs: 5, sm: 0 },
          mb: { xs: 5, sm: 5 },
        }}
      >
        <Typography
          sx={{
            color: '#16140c',
            fontSize: 32,
            fontFamily: 'Inter, "sans-serif"',
            textAlign: 'center',
            fontWeight: 600,
            lineHeight: { xs: '35px', sm: '55px' },
          }}
        >
          Bring your whole school together
        </Typography>
        <Typography
          variant='body2'
          sx={{
            fontFamily: 'Inter, "sans-serif"',
            textAlign: 'center',
            width: { xs: '90%', sm: '40%' },
            my: { xs: 2, sm: 1 },
          }}
        >
          Vireo's School MIS is the heart of operations and data for schools of all sizes and
          phases. Find out why more schools are switching to Arbor than any other cloud MIS.
        </Typography>
        <Button
          variant='contained'
          onClick={() => navigate('/signup')}
          sx={{
            py: 1.2,
            px: 1,
            width: 150,
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

      {/* <Box
        sx={{
          position: 'relative',
          height: 700,
          width: '100%',
          backgroundImage: `url(${LandingPageMainBg})`,
          backgroundSize: 'cover',
          backgroundPosition: '70% center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            color: 'white',
            fontSize: 105,
            width: '60%',
            fontFamily: 'Inter, "sans-serif"',
            textAlign: 'center',
          }}
        >
          Choose a{' '}
          <Box component='span' sx={{ fontStyle: 'italic' }}>
            better
          </Box>{' '}
          way to work
        </Typography>
      </Box> */}
      <Box
        sx={{
          px: { xs: 3, sm: 15 },
          py: 10,
          background: '#0e9b98ff',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <LogoVireo textColor='white' />
        <Typography
          variant='body2'
          sx={{
            fontSize: { xs: 16, sm: 20 },
            color: 'white',
          }}
        >
          UK: A2 NN Central Building, <br />
          Sheep Street NN1 2LU, Northampton.
        </Typography>
        <Typography
          variant='body2'
          sx={{
            fontSize: { xs: 16, sm: 20 },
            color: 'white',
          }}
        >
          NG: 12 Floor 3 Apo Sparklight Mall <br />
          Apo Abuja.
        </Typography>
      </Box>
    </Box>
  );
}
