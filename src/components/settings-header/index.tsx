import { Box, Typography } from '@mui/material';

interface SettingsHeaderProps {
  title: string;
}

export default function SettingsHeader({ title }: SettingsHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: { xs: '100%', sm: '300px' },
        gap: 1,
        mb: 2,
        pl: 2,
      }}
    >
      <Typography variant='subtitle1' fontWeight={400} color='rgb(56, 58, 63)' fontSize={14}>
        {title}
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          height: '1px',
          backgroundColor: 'rgba(0, 0, 0, 0.12)',
          borderRadius: 1,
        }}
      />
    </Box>
  );
}
