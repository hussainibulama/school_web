import React from 'react';
import { Card, Typography, Button, darken, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router';

const features = [
  'Up to 100 students',
  'Student Management',
  'Basic Grade Tracking',
  'Parent Communication',
  'Attendance Management',
  'Basic Reports',
  'Email Support',
];

const StarterPricingCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: { sm: 350, xs: '100%' },
        height: { sm: 520, xs: '100%' },
        borderRadius: 4,
        boxShadow: 0,
        border: '1px solid hsl(240, 5.9%, 90%)',
        '&:hover': {
          border: '1px solid rgba(59, 130, 246, 0.5)',
          boxShadow: 2,
        },
        p: 4,
      }}
    >
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
          Starter
        </Typography>
        <Typography
          sx={{
            color: 'rgb(75, 85, 99)',
            fontSize: { sm: '0.875rem', xs: '0.875rem' },
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          Perfect for small schools and academies
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
          ₦1500
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
            backgroundColor: 'rgb(17, 24, 39)',
            fontFamily: '"DM Sans", sans-serif',
            borderRadius: '0.4rem',
            textTransform: 'capitalize',
            boxShadow: 0,
            '&:hover': {
              boxShadow: 0,
              backgroundColor: darken('rgb(17, 24, 39)', 0.2),
            },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Card>
  );
};

export default StarterPricingCard;
