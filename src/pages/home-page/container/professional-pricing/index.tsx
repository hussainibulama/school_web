import React from 'react';
import { Card, Typography, Button, darken, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router';

const features = [
  'Up to 500 students',
  'Everything in Starter',
  'Advanced Analytics',
  'Custom Report Builder',
  'Timetable Management',
  'Priority Support',
  'Staff Management',
  'API Access',
  'Priority Support',
];

const ProfessionalPricingCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'visible',
        width: { sm: 350, xs: '100%' },
        height: { sm: 545, xs: '100%' },
        borderRadius: 4,
        boxShadow: 0,
        border: '1px solid rgb(59, 130, 246)',
        background: 'rgb(239, 246, 255)',
        p: 4,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          top: '-1rem',
          background: '#375DFB',
          width: 'auto',
          height: 'auto',
          justifySelf: 'center',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.775rem',
          fontWeight: 600,
          color: '#fff',
          px: '1rem',
          py: '0.5rem',
          borderRadius: 10,
        }}
      >
        <StarIcon fontSize='small' />
        &nbsp;Most Popular
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        gap={1}
        alignItems='center'
        justifyContent='center'
      >
        <Typography
          sx={{
            color: 'rgb(17, 24, 39)',
            fontSize: { sm: '1.5rem', xs: '1.475rem' },
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            lineHeight: '2rem',
          }}
        >
          Professional
        </Typography>
        <Typography
          sx={{
            color: 'rgb(75, 85, 99)',
            fontSize: { sm: '0.875rem', xs: '0.875rem' },
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          Ideal for growing educational institutions
        </Typography>
        <Typography
          sx={{
            color: 'rgb(17, 24, 39)',
            fontSize: { sm: '1.5rem', xs: '1.475rem' },
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            lineHeight: '2rem',
          }}
        >
          ₦3500
          <Typography
            component='span'
            sx={{
              color: 'rgb(75, 85, 99)',
              fontSize: '0.8rem',
            }}
          >
            /student/term
          </Typography>
        </Typography>

        <Box
          display='flex'
          width='100%'
          flexDirection='column'
          gap={0.4}
          justifyContent='flex-start'
        >
          {features.map((feature, index) => (
            <Box key={index} py={0.5} display='flex' gap={'0.75rem'}>
              <CheckIcon color='primary' fontSize='small' />
              <Typography
                sx={{
                  color: 'rgb(55, 65, 81',
                  fontSize: { sm: '0.875rem', xs: '0.875rem' },
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                {feature}
              </Typography>
            </Box>
          ))}
        </Box>

        <Button
          onClick={() => navigate('/signup')}
          variant='contained'
          color='primary'
          fullWidth
          sx={{
            mt: 3,
            px: '1rem',
            py: '0.75rem',
            width: '100%',
            height: '2rem',
            color: 'white',
            fontWeight: 500,
            fontSize: '0.775rem',
            backgroundColor: 'rgb(37, 99, 235)',
            fontFamily: '"DM Sans", sans-serif',
            borderRadius: '0.4rem',
            textTransform: 'capitalize',
            boxShadow: 0,
            '&:hover': {
              boxShadow: 0,
              backgroundColor: darken('rgb(37, 99, 235)', 0.2),
            },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Card>
  );
};

export default ProfessionalPricingCard;
