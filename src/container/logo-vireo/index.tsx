import { Box, Typography, useTheme } from '@mui/material';
import { Logo } from '../../assets';
import { APP_NAME } from '../../contants';

type LogoVireoProps = {
  hideName?: boolean;
  onClick?: () => void;
  logoSize?: number; // width in px
  nameSize?: number | string; // e.g. '24px' or 24
  centered?: boolean;
};

export default function LogoVireo({
  hideName = false,
  onClick,
  logoSize = 60,
  nameSize = 36,
  centered = false,
}: LogoVireoProps) {
  const theme = useTheme();

  return (
    <Box
      display='flex'
      onClick={onClick}
      sx={{
        alignItems: 'center',
        justifyContent: centered ? 'center' : 'flex-start',
        cursor: 'pointer',
        userSelect: 'none',
        gap: 1,
      }}
    >
      <Box
        component='img'
        src={Logo}
        alt='Vireo Logo'
        sx={{
          width: logoSize,
          height: 'auto',
        }}
      />
      {!hideName && (
        <Typography
          variant='h5'
          sx={{
            fontFamily: theme.typography.fontFamily,
            fontSize: nameSize,
            fontWeight: 600,
            color: 'rgb(56, 58, 63)',
          }}
        >
          {APP_NAME}
        </Typography>
      )}
    </Box>
  );
}
