import { Box, Typography, useTheme } from '@mui/material';
import { Logo } from '../../assets';

export default function LogoVireo() {
  const theme = useTheme();
  return (
    <Box
      display='flex'
      sx={{
        alignItems: 'flex-start',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <Box
        component='img'
        src={Logo}
        alt='Vireo Logo'
        sx={{ width: 60, height: 'auto' }} // adjust size as needed
      />
      <Typography
        variant='h5'
        sx={{
          fontFamily: theme.typography.fontFamily,
          fontSize: '36px',
          fontWeight: 600,
          color: 'rgb(56, 58, 63)',
          paddingLeft: '5px',
        }}
      >
        Vireo
      </Typography>
    </Box>
  );
}
