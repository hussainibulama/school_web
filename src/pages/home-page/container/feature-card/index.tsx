import { ElementType } from 'react';
import { Box, Typography } from '@mui/material';

interface FeatureCardProps {
  label: string;
  title: string;
  icon?: ElementType;
  color: string;
}

export default function FeatureCard({ label, title, icon: Icon, color }: FeatureCardProps) {
  return (
    <Box
      sx={{
        height: '100%',
        width: { sm: 350, xs: '100%' },
        background: '#fff',
        borderRadius: '0.8rem',
        border: '1px solid rgb(229, 231, 235)',
        boxShadow: 0,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: '2rem',
        gap: 2,
        '&:hover': {
          border: '1px solid #bfdbfe',
        },
      }}
    >
      <Box
        sx={{
          background: color,
          height: 38,
          width: 38,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
        }}
      >
        {Icon && <Icon height='20px' width='20px' />}
      </Box>
      <Typography
        variant='body2'
        sx={{
          fontFamily: '"DM Sans", sans-serif',
          color: 'rgb(17, 24, 39)',
          fontWeight: 600,
          fontSize: '1.25rem',
          lineHeight: '1.75rem',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography
          variant='body1'
          fontWeight={600}
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            color: 'rgb(75, 85, 99)',
            fontWeight: 400,
            fontSize: '0.875rem',
            lineHeight: 1.625,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
}
