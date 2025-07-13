import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import Loader from '../loader';

interface IClassBannerProps {
  label: string;
  isLoading: boolean;
  children?: ReactNode;
}

export default function ClassBanner({ label, isLoading, children }: IClassBannerProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: '#68aa22',
        padding: '20px 30px',
        height: 170,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',

        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          width: '150%',
          height: '150%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          transform: 'rotate(-10deg)',
          top: '-120%',
          left: '-10%',
        },
      }}
    >
      {isLoading && <Loader />}
      <Typography
        variant='subtitle1'
        fontWeight={900}
        mb={2}
        sx={{
          color: 'white',
          fontSize: 38,
          textTransform: 'capitalize',
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}
