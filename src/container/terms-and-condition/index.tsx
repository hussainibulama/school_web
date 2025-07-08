import { Typography, useTheme, Link } from '@mui/material';

const linkStyle = {
  color: '#ada8a6',
  textDecoration: 'underline',
  '&:hover': {
    color: '#c2bdbb',
  },
};

export default function TermsAndCondition() {
  const theme = useTheme();

  return (
    <Typography
      variant='body2'
      color='#ada8a6'
      align='center'
      sx={{
        mt: 4,
        py: 2,
        fontFamily: theme.typography.fontFamily,
        fontSize: '14px',
      }}
    >
      &copy; {new Date().getFullYear()} Lightweb Ltd. All rights reserved.{' '}
      <Link href='/terms' underline='always' sx={linkStyle}>
        Terms and condition
      </Link>{' '}
      |{' '}
      <Link href='/privacy-policy' underline='always' sx={linkStyle}>
        Privacy Policy
      </Link>
    </Typography>
  );
}
